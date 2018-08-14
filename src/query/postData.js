const bcrypt = require('bcryptjs');

const createNewUser = (username, password) => {
  const hashedPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          // store hash in DB
        });
      }
    });
  };
};

module.exports = { createNewUser };
