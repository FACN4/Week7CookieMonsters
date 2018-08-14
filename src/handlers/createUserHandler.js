const { checkUsernameExists } = require('./createUserHandler');

const createUserHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const body = JSON.parse(allData);
    console.log(body);
    // Check username isn't already taken
  });
};


module.exports = createUserHandler;
