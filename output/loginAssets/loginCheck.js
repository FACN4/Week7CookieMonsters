'use strict';

/* global postJsonXHR */
/* eslint-disable no-unused-vars */

// sending login details to server side to check user and password matching

var login = function login(details, cb) {
  postJsonXHR('/login', details, function (err) {
    if (err) {
      cb(err);
    } else {
      window.location.replace('/main.html');
    }
  });
};