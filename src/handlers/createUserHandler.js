const { checkUsernameExists } = require('../query/getData.js');
const { createNewUser } = require('../query/postData.js');

const createUserHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const userDetails = JSON.parse(allData);
    checkUsernameExists(userDetails.username, (userIsUnique) => {
      if (userIsUnique) {
        createNewUser(userDetails, console.log);
        // Tell front end all ok
      } else {
        // Tell front end to change username
      }
    });
    // Check username isn't already taken
  });
};


module.exports = createUserHandler;
