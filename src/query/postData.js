const bcrypt = require('bcryptjs');
const dbConnection = require('../database/dbconnection.js');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
    }
  });
};

const createNewUser = (userDetails, cb) => {
  hashPassword(userDetails.password, (err, hash) => {
    // SQL command to store username and hash
    const imgURL = `https://robohash.org/${userDetails.username}`;
    const colourID = Math.floor(Math.random() * 100) + 1;
    const queryString = `INSERT INTO users (name, password, photo_url,is_admin,name_colour_id)
    VALUES ($1, $2, $3, $4, $5);`;

    const values = [userDetails.username, hash, imgURL, false, colourID];

    dbConnection.query(queryString, values, (error) => {
      if (error) {
        cb(error);
      } else {
        cb(null);
      }
    });
  });
};

const sendMsg = (userID, message, cb) => {
  const queryString = `INSERT INTO messages (date, text, user_id)
                        VALUES ($1,$2,$3)`;
  const date = Date.now();
  dbConnection.query(queryString, [date, message, userID], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};


module.exports = { createNewUser, sendMsg };
