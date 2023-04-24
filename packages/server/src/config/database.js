const databaseConfig = require('../../config/database.json');

const dialect = databaseConfig.DIALECT;
const host = databaseConfig.HOST;
const username = databaseConfig.USERNAME;
const password = databaseConfig.PASSWORD;
const database = databaseConfig.DATABASE;
const define = {
  timestamps: true,
  underscored: true
};

module.exports = {
  dialect,
  host,
  username,
  password,
  database,
  define
};
