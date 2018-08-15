'use strict';

/* global signUp */
/* eslint-disable no-param-reassign */

var username = document.getElementById('username');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');
var form = document.getElementsByTagName('form')[0];
var meter = document.getElementById('meter');

var usernameErr = document.getElementById('usernameErr');
var passwordErr = document.getElementById('passwordErr');
var confirmErr = document.getElementById('confirmErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

var checkUsername = function checkUsername() {
  if (username.validity.valueMissing) {
    displayErr(usernameErr, 'Please enter a username');
  } else if (false) {
    // userNameUsed(username.value) not already in database
    displayErr(usernameErr, 'Sorry, this username has already been used');
  } else {
    displayErr(usernameErr, '');
    return true;
  }
  return false;
};

var checkPw = function checkPw() {
  if (password.validity.patternMismatch) {
    displayErr(passwordErr, 'Password must contain at least eight characters, including one letter and one number');
    return false;
  }if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
    return false;
  }
  displayErr(passwordErr, '');
  return true;
};

var checkConfirmPw = function checkConfirmPw() {
  if (password.value !== confirmPassword.value) {
    displayErr(confirmErr, 'Passwords do not match');
    return false;
  }if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, 'Please confirm your password');
    return false;
  }
  displayErr(confirmErr, '');
  return true;
};

// should you add a break after each case?
var passwordScore = function passwordScore() {
  var pass = password.value;
  var user = username.value;
  var score = 0;
  if (pass.length > 8) score += 1;
  if (/(?=.*[A-Z])(?=.*[a-z])/.test(pass)) score += 1; // Upper and Lower case
  if (/[0-9]/.test(pass)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(pass)) score += 1; // Special characters
  if (!pass.includes(user) && !user.includes(pass)) score += 1;
  meter.value = score;
};

username.addEventListener('focusout', checkUsername);
password.addEventListener('focusout', checkPw);
confirmPassword.addEventListener('focusout', checkConfirmPw);

password.addEventListener('keyup', passwordScore);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (checkUsername() && checkPw() && checkConfirmPw()) {
    var userDetails = { username: username.value, password: password.value };
    signUp(userDetails, function (errMsg) {
      return displayErr(usernameErr, errMsg);
    });
  }
});