const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('restaurant tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });
  it('Create a restaurant', async () => {
    const res = await request(app)
      .post('/restaurants')
      .send({
        location: 'location for create test'
      });
    expect(res.body).toEqual({
      id: '1',
      location: 'location for create test'
    });
  });

});
