'use strict';

/* global login */
/* eslint-disable no-param-reassign */

console.log('THIS IS SUBMIT LOGIN');

var userNameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var loginBtnElement = document.getElementById('loginBTN');

var usernameErr = document.getElementById('usernameErr');
// const passwordErr = document.getElementById('passwordErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

var validateLogin = function validateLogin(userName, passwordOf) {
  console.log('GOT INTO validateLogin');
  var userDetails = { username: userName, password: passwordOf };
  console.log(' THIS IS VALIDATE LOGIN DETAILS: ', userName, passwordOf);
  // const userDetails = { username: '1234', password: '1234' };
  login(userDetails, function (errMsg) {
    return displayErr(usernameErr, errMsg);
  });
};

loginBtnElement.addEventListener('click', function (event) {
  event.preventDefault();
  validateLogin(userNameElement.value, passwordElement.value);
});