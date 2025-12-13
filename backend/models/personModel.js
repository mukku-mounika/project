const pool = require("../db");
module.exports = {
  findByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM person WHERE person_email=$1",
      [email]
    );
    return result.rows[0];
  },
  create: async ({ person_name, person_email, person_password }) => {
    const result = await pool.query(
      `INSERT INTO person (person_name, person_email, person_password)
      VALUES ($1, $2, $3)
      RETURNING person_id, person_name, person_email`,
      [person_name, person_email, person_password]
    );
    return result.rows[0];
  }
};
