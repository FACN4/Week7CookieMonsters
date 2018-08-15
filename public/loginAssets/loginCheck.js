/* global postJsonXHR */
/* eslint-disable no-unused-vars */

// sending login details to server side to check user and password matching

const login = (details, cb) => {
  postJsonXHR('/login', details, (err) => {
    if (err) {
      cb(err);
    } else {
      window.location.replace('/main.html');
    }
  });
};
