/* global login */
/* eslint-disable no-param-reassign */

console.log('THIS IS SUBMIT LOGIN');

const userNameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const loginBtnElement = document.getElementById('loginBTN');

const usernameErr = document.getElementById('usernameErr');
// const passwordErr = document.getElementById('passwordErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

const validateLogin = (userName, passwordOf) => {
  console.log('GOT INTO validateLogin');
  const userDetails = { username: userName, password: passwordOf };
  console.log(' THIS IS VALIDATE LOGIN DETAILS: ', userName, passwordOf);
  // const userDetails = { username: '1234', password: '1234' };
  login(userDetails, errMsg => displayErr(usernameErr, errMsg));
};

loginBtnElement.addEventListener('click', (event) => {
  event.preventDefault();
  validateLogin(userNameElement.value, passwordElement.value);
});
