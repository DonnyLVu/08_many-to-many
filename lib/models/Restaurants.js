const pool = require('../utils/pool');
//  PARENT OF MENU
module.exports = class Restaurant {
  id;
  location;

  constructor(row) {
    this.id = String(row.id);
    this.location = row.location;
  }

  static async insert({ location, menus = [] }) {
    const { rows } = await pool.query(
      `INSERT INTO restaurants
      (location)
      VALUES ($1)
      RETURNING *`,
      [location]
    );
    await pool.query(
      `INSERT INTO restaurants_menus 
      (restaurants_id, menus_id)
      SELECT ${rows[0].id},
      id
      FROM menus
      WHERE name = ANY($1::text[])`, [menus]);
    return new Restaurant(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map(row => new Restaurant(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT 
        restaurants.*,
        json_agg(menus.name) AS menus
        FROM restaurants_menus
        JOIN restaurants
        ON restaurants_menus.restaurants_id = restaurants.id
        JOIN menus
        on restaurants_menus.menus_id = menus.id
      WHERE restaurants.id = $1
      GROUP BY restaurants.id`,
      [id]
    );
    if (!rows[0]) throw new Error(`no restaurants with id of ${id}`);
    return { ...new Restaurant(rows[0]), menus: rows[0].menus };
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
