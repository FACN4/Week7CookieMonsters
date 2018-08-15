const homePageHandler = require('./homePageHandler');
const notFoundHandler = require('./notFoundHandler');
const assetsHandler = require('./assetsHandler');
const createUserHandler = require('./createUserHandler');
const loginHandler = require('./loginHandler');
const sendMsgHandler = require('./sendMsgHandler');
const getMsgsHandler = require('./getMsgsHandler');
const logoutHandler = require('./logoutHandler');
const mainHandler = require('./mainHandler');

module.exports = {
  homePageHandler,
  notFoundHandler,
  assetsHandler,
  createUserHandler,
  loginHandler,
  sendMsgHandler,
  getMsgsHandler,
  logoutHandler,
  mainHandler,
};
