const { checkUsernameExists } = require('../query/getData.js');
const { createNewUser } = require('../query/postData.js');

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
        createNewUser(userDetails, (error) => {
          if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Sorry we were not able to make you an account');
          } else {
            console.log('We have made an account');
            // Username creation successfull
            response.writeHead(200);
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
