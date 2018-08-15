const { sendMsg } = require('../query/postData.js');

const sendMsgHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const message = JSON.parse(allData);
    const userID = 1;
    sendMsg(userID, message, (err) => {
      if (err) {
        console.log(err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('sorry your message could not be sent');
      } else {
        response.writeHead(200);
        response.end();
      }
    });
  });
};

module.exports = sendMsgHandler;
