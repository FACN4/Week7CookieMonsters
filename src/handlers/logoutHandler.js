const logoutHandler = (request, response) => {
  response.writeHead(200, { 'Set-Cookie': 'jwt=0; Max-Age=0' });
  response.end();
};

module.exports = logoutHandler;
