const { Pool } = require('pg');
require('env2')('./config.env');

let { CHATROOMDB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
  CHATROOMDB_URL = process.env.TESTCHATROOMDB_URL;
}

if (!CHATROOMDB_URL) throw new Error('Enviroment variable DB_URL must be set');

const options = {
  connectionString: CHATROOMDB_URL,
};


module.exports = new Pool(options);
