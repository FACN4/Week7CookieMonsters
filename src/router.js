const handlers = require('./handlers/handlers');

const assetURLs = [
  '/login.html',
  '/createAccount.html',
  '/mainAssets/main.js',
  '/mainAssets/dom.js',
  '/mainAssets/main.css',
  '/loginAssets/submitLogin.js',
  '/dom.js',
  '/style.css',
  '/mainAssets/xhr.js',
  '/mainAssets/favicon.ico',
  '/supertest-500',
  '/loginAssets/forms.css',
  '/loginAssets/loginCheck.js',
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
  } else if (url === '/send-msg') {
    handlers.sendMsgHandler(request, response);
  } else if (url === '/get-msgs') {
    handlers.getMsgsHandler(request, response);
  } else if (url === '/logout') {
    handlers.logoutHandler(request, response);
  } else if (url === '/main.html') {
    handlers.mainHandler(request, response);
  } else if (url === '/unlockCookie') {
    handlers.unlockCookieHandler(request, response);
  } else {
    handlers.notFoundHandler(response);
  }
};

module.exports = router;
