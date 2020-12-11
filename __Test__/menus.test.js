const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const Restaurant = require('../lib/models/Restaurants.js');

describe('Menu app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('Creates menu', async () => {
    const res = await request(app)
      .post('/menus')
      .send({
        name: 'name for create menu'
      });
    expect(res.body).toEqual({
      id: '1',
      name: 'name for create menu'
    });
  });
});
