const bcrypt = require('bcryptjs');
const dbConnection = require('../database/dbconnection.js');
const { getPassword } = require('./getPassword');
const { checkUsernameExists } = require('./getData');

const checkNameAndPassword = ({ username, password }, cb) => {
  checkUsernameExists(username, (err, res) => {
    if (err) {
      cb(err);
    } else if (!res) {
      // username exists in the database
      getPassword(username, (err2, userProperties) => {
        bcrypt.compare(password, userProperties.password, (error, same) => {
          if (error) {
            cb(error);
          } else if (!same) {
            // passwords don't match
            cb(null, 'passwords do not match');
          } else if (same) {
            // passwords are matching
            cb(null, userProperties);
          }
        });
      });
    } else if (res) {
      // username do not exist in the data base
      cb(null, 'user do not exist');
    }
  });
};
// const hashPassword = (password, callback) => {
//   console.log('In hashPassword');
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       console.log('hasherr', err);
//       callback(err);
//     } else {
//       console.log('hash worked');
//       bcrypt.hash(password, salt, callback);
//     }
//   });
// };

// const checkNameAndPassword = (data, cb) => {
//   console.log('\n beginning of checkNameAndPassword QUERY \n');
//   console.log('username & pass', data.password, data.username);
//
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       console.log('hasherr', err);
//       // callback(err);
//     } else {
//       console.log('hash worked');
//       bcrypt.hash(data.password, salt, (err1, hash) => {
//         console.log('hash here: ', hash);
//         const queryString = 'SELECT coalesce((SELECT users.id from users where name=$1 AND password=$2),0 )';
//         const values = [data.username, hash];
//         dbConnection.query(queryString, values, (err2, res) => {
//           if (err2) {
//             console.log('got into error in sql');
//             cb(err2);
//           } else {
//             cb(null, res.rows);
//           }
//         });
//       });
//     }
//   });
// };

module.exports = { checkNameAndPassword };
