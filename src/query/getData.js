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

const getMsgs = (cb) => {
  const queryString = `SELECT * FROM (SELECT messages.date, messages.text, users.name, users.photo_url, users.is_admin, colour.colour FROM messages
                INNER JOIN users ON messages.user_id = users.id
                INNER JOIN colour ON colour.id = users.name_colour_id
                ORDER BY messages.date DESC LIMIT 50) AS tbl ORDER BY tbl.date ASC;`;
  dbConnection.query(queryString, (error, res) => {
    if (error) {
      cb(error, false);
    } else {
      cb(null, res.rows);
    }
  });
};


module.exports = { checkUsernameExists, getMsgs };
