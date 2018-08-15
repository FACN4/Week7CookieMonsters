const fs = require('fs');
const path = require('path');
const cookie = require('cookie');
const { verify } = require('jsonwebtoken');

const filePathMain = path.join(__dirname, '..', '..', 'output', 'main.html');

const SECRET = 'denis';

const mainHandler = (request, response) => {
  // Check if user has an account
  let hasAccount = false;
  if (request.headers.cookie) {
    const { jwt } = cookie.parse(request.headers.cookie);
    verify(jwt, SECRET, (err) => {
      console.log(err);
      if (!err) {
        hasAccount = true;
      }
    });
  }

  if (hasAccount) {
    fs.readFile(filePathMain, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>Sorry, something went wrong</h1>');
      } else {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404, { 'Content-type': 'text/html' });
    response.end('<h1>Access denied, nice try</h1>');
  }
};

module.exports = mainHandler;
