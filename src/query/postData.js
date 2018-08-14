const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
    }
  });
};
const createNewUser = (username, password) => {
  hashPassword(password, (err, hash) => {

    // SQL command to store username and hash
  });
};

module.exports = { createNewUser };
