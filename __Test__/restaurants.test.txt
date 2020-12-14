const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Restaurant = require('../lib/models/Restaurants.js');

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

  it('Get ALL restaurants', async () => {
    const restaurants = await Promise.all([
      {
        location: 'location 1 for all'
      },
      {
        location: 'location 2 for all'
      },
      {
        location: 'location 3 for all'
      }
    ].map(restaurant => Restaurant.insert(restaurant)));

    const res = await request(app)
      .get('/restaurants');
    expect(res.body).toEqual(expect.arrayContaining(restaurants));
    expect(res.body).toHaveLength(restaurants.length);
  });

  it('Get by id', async () => {
    const restaurant = await Restaurant.insert({ location: 'location for get by id' });
    const res = await request(app)
      .get(`/restaurants/${restaurant.id}`);
    expect(res.body).toEqual({
      id: '1',
      location: 'location for get by id'
    });
  });

  it('Updates a restauramt', async () => {
    const restaurant = await Restaurant.insert({ location: 'location for update' });
    const res = await request(app)
      .put(`/restaurants/${restaurant.id}`)
      .send({
        location: 'return new location for update'
      });
    expect(res.body).toEqual({
      id: '1',
      location: 'return new location for update'
    });
  });

  it('Deletes a restaurant', async () => {
    const restaurant = await Restaurant.insert({ location: 'location for delete' });
    const res = await request(app)
      .delete(`/restaurants/${restaurant.id}`);
    expect(res.body).toEqual({
      id: '1',
      location: 'location for delete'
    });
  });
});
