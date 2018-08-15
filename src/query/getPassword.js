const dbConnection = require('../database/dbconnection.js');

const getPassword = (username, cb) => {
  const queryString = 'SELECT * FROM users WHERE name = $1;';
  dbConnection.query(queryString, [username], (error, res) => {
    if (error) {
      cb(error);
    } else {
      cb(null, res.rows[0]);
    }
  });
};


module.exports = { getPassword };
