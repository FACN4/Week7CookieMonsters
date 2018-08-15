const cookie = require('cookie');
const { verify } = require('jsonwebtoken');
const { sendMsg } = require('../query/postData.js');

const SECRET = 'denis';

const sendMsgHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    let userID;
    const message = JSON.parse(allData);
    const { jwt } = cookie.parse(request.headers.cookie);
    verify(jwt, SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('sorry your message could not be sent');
      } else {
        userID = decoded.user_id;
        console.log(decoded);
        sendMsg(userID, message, (error) => {
          if (error) {
            console.log(err);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('sorry your message could not be sent');
          } else {
            response.writeHead(200);
            response.end();
          }
        });
      }
    });
  });
};

module.exports = sendMsgHandler;
