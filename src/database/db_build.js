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

// Fn involved in making random hex colours
const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const fillColourTable = () => {
  for (let i = 0; i < 200; i += 1) {
    const query = 'INSERT INTO colour (colour) VALUES ($1);';
    const r = Math.floor(Math.random() * 150) + 1;
    const g = Math.floor(Math.random() * 150) + 1;
    const b = Math.floor(Math.random() * 150) + 1;
    dbConnection.query(query, [rgbToHex(r, g, b)], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('colour made');
      }
    });
  }
};

if (process.argv[2] === 'run') {
  runDbBuild()
    .then(fillColourTable())
    .catch(console.log);
}

module.exports = runDbBuild;
