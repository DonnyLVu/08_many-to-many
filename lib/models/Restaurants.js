const pool = require('../utils/pool');
//  PARENT OF MENU
module.exports = class Restaurant {
  id;
  name;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
  }
  static async insert({ name, location }) {
    const { rows } = await pool.query(
      `INSERT INTO restaurants
      (name, location)
      VALUES ($1, $2)
      RETURNING *`,
      [name, location]
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
  static async update(id, { name, location }) {
    const { rows } = await pool.query(
      `UPDATE restaurants
      SET
        name=$1,
        location=$2,
        WHERE id=$3
      RETURNING *`,
      [name, location, id]
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