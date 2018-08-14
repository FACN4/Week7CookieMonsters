const bcrypt = require('bcryptjs');

const createNewUser = (username, password) => {
  const hashedPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback(err);
      } else {

      }
    });
  };
};

module.exports = { createNewUser };
