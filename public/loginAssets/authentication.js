/* global postJsonXHR */
/* eslint-disable no-unused-vars */

const signUp = (details) => {
  postJsonXHR('/create-user', details, console.log);
};
