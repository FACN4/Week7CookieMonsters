const { sign } = require('jsonwebtoken');
const { createNewUser } = require('../query/postData.js');
const { checkUsernameExists } = require('../query/getData.js');

const SECRET = 'denis';
const createUserHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const userDetails = JSON.parse(allData);
    checkUsernameExists(userDetails.username, (err, userIsUnique) => {
      if (err) {
        console.log(err);
      } else if (userIsUnique) {
        createNewUser(userDetails, (error, resp) => {
          if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Sorry we were not able to make you an account');
          } else {
            const user = resp.rows[0];
            // Username creation successfull
            const cookieDetails = { user_id: user.id, name: user.name };
            const cookie = sign(cookieDetails, SECRET);
            response.writeHead(200, { 'Set-Cookie': `jwt=${cookie}; HttpOnly` });
            response.end();
          }
        });
      } else {
        response.writeHead(202, { 'Content-Type': 'text/plain' });
        response.end('Sorry, that username is already taken');
      }
    });
  });
};


module.exports = createUserHandler;
