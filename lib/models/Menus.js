const pool = require('../utils/pool');
// MENU IS CHILD OF RESURANTS
module.exports = class Menu {
  id;
  name;

  constructor(row) {
    this.id = String(row.id);
    this.name = row.name;
  }
  static async insert({ name }) {
    const { rows } = await pool.query(
      `INSERT INTO menus
      (name)
      VALUES ($1)
      RETURNING *`,
      [name]
    );
    return new Menu(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query('SELECT * FROM menus');
    return rows.map(row => new Menu(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM menus
      WHERE id=$1`,
      [id]
    );
    if (!rows[0]) throw new Error(`no menu with id of ${id}`);
    return new Menu(rows[0]);
  }
  static async update(id, { name }) {
    const { rows } = await pool.query(
      `UPDATE menus
      SET
        name=$1,
        WHERE id=$2
      RETURNING *`,
      [name, id]
    );
    if (!rows[0]) throw Error(`No menu with id of${id}`);
    return new Menu(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM menus
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Menu(rows[0]);
  }
};
