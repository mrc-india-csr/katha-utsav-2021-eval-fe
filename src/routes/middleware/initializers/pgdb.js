const {Pool} = require('pg');
const config = require('../../../config');

const {pgDatabaseHost, pgDatabasePort, pgDatabaseName, pgDatabaseUserName, pgDatabasePassword} = config;

export const pool = new Pool({
  host: pgDatabaseHost,
  port: pgDatabasePort,
  database: pgDatabaseName,
  user: pgDatabaseUserName,
  password: pgDatabasePassword,
});