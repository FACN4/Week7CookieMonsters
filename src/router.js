const handlers = require('./handlers/handlers');

const assetURLs = [
  '/main.html',
  '/login.html',
  '/createAccount.html',
  '/dom.js',
  '/style.css',
  '/xhr.js',
  '/favicon.ico',
  '/supertest-500',
];

const router = (request, response) => {
  const { url } = request;
  if (url === '/') {
    handlers.homePageHandler(request, response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, request, response);
  } else if (url === '/create-user') {
    handlers.createUserHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
