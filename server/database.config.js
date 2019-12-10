const knex = require("knex");

const db = knex({
  client: process.env.CLIENT,
  version: process.env.VIRSION,
  connection: {
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_LOGIN_USERNAME,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_USERNAME,
  },
});
module.exports = db;
