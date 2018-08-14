const handlers = require('./handlers/handlers');

const assetURLs = [
  '/main.html',
  '/login.html',
  '/createAccount.html',
  '/dom.js',
  '/style.css',
  '/mainAssets/xhr.js',
  '/favicon.ico',
  '/supertest-500',
  '/loginAssets/forms.css',
  '/loginAssets/authentication.js',
  '/loginAssets/validation.js',
];

const router = (request, response) => {
  const { url } = request;
  console.log(url);
  if (url === '/') {
    handlers.homePageHandler(request, response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, request, response);
  } else if (url === '/create-user') {
    handlers.createUserHandler(request, response);
  } else if (url === '/login') {
    handlers.loginHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
