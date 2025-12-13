const pool = require("../db");
class CategoryModel {
  static getAll(person_id) {
    return pool.query(
      `SELECT * FROM categories WHERE person_id=$1 ORDER BY categories_id DESC`,
      [person_id]
    );
  }
  static create(name, person_id) {
    return pool.query(
      `INSERT INTO categories (name, person_id) VALUES ($1, $2) RETURNING *`,
      [name, person_id]
    );
  }
  static update(id, {name, person_id}) {
    return pool.query(
      `UPDATE categories SET name=$1 WHERE categories_id=$2 AND person_id=$3 RETURNING *`,
      [name, id, person_id]
    );
  }
  static delete(id, person_id) {
    return pool.query(
      "DELETE FROM categories WHERE categories_id=$1 AND person_id=$2 RETURNING *",
      [id, person_id]
    );
  }
}
module.exports = CategoryModel;

