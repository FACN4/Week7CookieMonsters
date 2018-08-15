const cookie = require('cookie');
const { verify } = require('jsonwebtoken');

const SECRET = 'denis';

const unlockCookieHandler = (request, response) => {
  const { jwt } = cookie.parse(request.headers.cookie);
  verify(jwt, SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('sorry we could not personalise your experience');
    } else {
      console.log(decoded);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(decoded));
    }
  });
};

module.exports = unlockCookieHandler;
