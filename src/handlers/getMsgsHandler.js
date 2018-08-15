const { getMsgs } = require('../query/getData');

const getMsgsHandler = (request, response) => {
  getMsgs((err, messages) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Sorry, we cannot fill the board with messages');
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(messages));
    }
  });
};

module.exports = getMsgsHandler;
