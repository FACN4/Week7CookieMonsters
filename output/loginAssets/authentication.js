'use strict';

/* global postJsonXHR */
/* eslint-disable no-unused-vars */

var signUp = function signUp(details, cb) {
  postJsonXHR('/create-user', details, function (err) {
    if (err) {
      cb(err);
    } else {
      // Redirect to main.html
      window.location.replace('/main.html');
    }
  });
};