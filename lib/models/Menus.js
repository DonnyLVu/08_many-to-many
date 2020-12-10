const pool = require('../pool');
// MENU IS CHILD OF RESURANTS
module.exports = class Menu {
  id;
  length;
  type;
  menuId;

  constructor(row) {
    this.id = String(row.id);
    this.length = row.length;
    this.type = row.type;
    this.menuId = String(row.menu_id);
  }
  static async insert({ length, type, menuId }) {
    const { rows } = await pool.query(
      `INSERT INTO menus
      (length, book_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [length, type, menuId]
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
  static async update(id, { length, type, menuId }) {
    const { rows } = await pool.query(
      `UPDATE menus
      SET
        length=$1,
        type=$2,
        menu_id=$4
        WHERE id=$5
      RETURNING *`,
      [length, type, menuId, id]
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
