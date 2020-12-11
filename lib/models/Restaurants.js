const pool = require('../utils/pool');
//  PARENT OF MENU
module.exports = class Restaurant {
  id;
  location;

  constructor(row) {
    this.id = String(row.id);
    this.location = row.location;
  }
  static async insert({ location }) {
    const { rows } = await pool.query(
      `INSERT INTO restaurants
      (location)
      VALUES ($1)
      RETURNING *`,
      [location]
    );
    return new Restaurant(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map(row => new Restaurant(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM restaurants
      WHERE id=$1`,
      [id]
    );
    if (!rows[0]) throw new Error(`no restaurants with id of ${id}`);
    return new Restaurant(rows[0]);
  }
  static async update(id, { location }) {
    const { rows } = await pool.query(
      `UPDATE restaurants
      SET
        location=$1
        WHERE id=$2
      RETURNING *`,
      [location, id]
    );
    if (!rows[0]) throw Error(`No restaurants with id of${id}`);
    return new Restaurant(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM restaurants
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Restaurant(rows[0]);
  }
};
