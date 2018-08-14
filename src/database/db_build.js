const fs = require('fs');
const dbConnection = require('./dbconnection');

const makeEmptyTables = fs.readFileSync(`${__dirname}/build.sql`, 'utf-8');

const runDbBuild = () => new Promise((resolve, reject) => {
  dbConnection.query(makeEmptyTables, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve('success');
    }
  });
});

runDbBuild.then(console.log).catch(console.log);

module.exports = runDbBuild;
