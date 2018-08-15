/* global login */
/* eslint-disable no-param-reassign */

const userNameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const loginBtnElement = document.getElementById('loginBTN');

const usernameErr = document.getElementById('usernameErr');
const passwordErr = document.getElementById('passwordErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

const validateLogin = (userName, passwordOf) => {
  const userDetails = { username: userName, password: passwordOf };
  // const userDetails = { username: '1234', password: '1234' };
  login(userDetails, (errMsg) => {
    if (errMsg === 'passwords do not match') {
      displayErr(passwordErr, errMsg);
    } else {
      displayErr(usernameErr, errMsg);
    }
  });
};

loginBtnElement.addEventListener('click', (event) => {
  event.preventDefault();
  displayErr(passwordErr, '');
  displayErr(usernameErr, '');
  validateLogin(userNameElement.value, passwordElement.value);
});
