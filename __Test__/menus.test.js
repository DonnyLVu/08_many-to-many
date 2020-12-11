const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Restaurant = require('../lib/models/Restaurants.js');

describe('Menu app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });
  it('Creates a menu', async () => {
    const res = await request(app)
      .post('/menus')
      .send({
        length: 'Chattanooga, TN',
        length: 'creates menu',
        type: 'create menu should go here',
        restaurantId: restaurant.id
      });

    expect(res.body).toEqual({
      id: '1',
      location: 'Chattanooga, TN'
    });
  });
});

// it('creates a menu', async () => {
//   const restaurant = await Restaurant.insert({ name: 'creates name', location: 'create location should go here' });
//   const res = await request(app)
//     .post('/menus')
//     .send({
//       length: 'creates menu',
//       type: 'create menu should go here',
//       restaurantId: restaurant.id
//     });
//   expect(res.body).toEqual({
//     id: '1',
//     length: 'creates menu',
//     type: 'create menu should go here',
//     restaurantId: restaurant.id
//   });
// });