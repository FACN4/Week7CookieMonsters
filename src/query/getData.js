const dbConnection = require('../database/dbconnection.js');

const checkUsernameExists = (username, cb) => {
  const queryString = 'SELECT name FROM users WHERE name = $1;';
  dbConnection.query(queryString, [username], (error, res) => {
    if (error) {
      cb(error, false);
    } else {
      console.log(res.rows);
      cb(null, res.rows.length === 0);
    }
  });
};

module.exports = { checkUsernameExists };
