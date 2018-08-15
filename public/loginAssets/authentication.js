/* global postJsonXHR */
/* eslint-disable no-unused-vars */

const signUp = (details, cb) => {
  postJsonXHR('/create-user', details, (err) => {
    if (err) {
      cb(err);
    } else {
    // Redirect to main.html
      window.location.replace('/main.html');
    }
  });
};
