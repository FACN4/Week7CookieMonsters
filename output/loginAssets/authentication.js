'use strict';

/* global postJsonXHR */
/* eslint-disable no-unused-vars */

var signUp = function signUp(details) {
  postJsonXHR('/create-user', details, console.log);
};