const pool = require("../db");
class ExpenseModel {
  static getAll(person_id) {
    return pool.query(
      `SELECT e.*, c.name AS category_name
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.categories_id
      WHERE e.person_id = $1
      ORDER BY e.date DESC`,
      [person_id]
    );
  }
  static create({ title, category_id, amount, date, note, person_id }) {
    return pool.query(
      `INSERT INTO expenses (title, category_id, amount, date, note, person_id)
      VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, category_id, amount, date || null, note || null, person_id]
    );
  }
  static update(id, { title, category_id, amount, date, note, person_id }) {
    return pool.query(
      `UPDATE expenses
      SET title=$1, category_id=$2, amount=$3, date=$4, note=$5
      WHERE expense_id=$6 AND person_id=$7
       RETURNING *`,
      [title, category_id, amount, date || null, note || null, id, person_id]
    );
  }
  static delete(id, person_id) {
    return pool.query(
      `DELETE FROM expenses WHERE expense_id=$1 AND person_id=$2 RETURNING *`,
      [id, person_id]
    );
  }
}

module.exports = ExpenseModel;
