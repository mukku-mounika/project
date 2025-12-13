const { Pool } = require("pg");
const pool = new Pool({
  user: "hm_user",
  host: "144.126.252.213",
  database: "hm_dev_db",
  password: "wTXD_Ptwp-EsHdHJTWF4eQSqWw01kapyxAeJyhknXIWcZgHk",
  port: 5432,
});
module.exports = pool;

try {
    dbConn = require('knex')({"client": "pg",
    "connection":{
      
  user: "hm_user",
  host: "144.126.252.213",
  database: "hm_dev_db",
  password: "wTXD_Ptwp-EsHdHJTWF4eQSqWw01kapyxAeJyhknXIWcZgHk",
  port: 5432,
}})
    dbConn.raw('SELECT version()')
        .then((result) => {
            console.log('Database connection successful:', result.rows[0]);
        })
        .catch((error) => {
            console.error('Database connection error:', error);
        });
    dbConn.on('start', (builder) => {
        console.log('sql', builder.toString());
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
