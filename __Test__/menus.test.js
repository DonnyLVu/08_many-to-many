const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Menu = require('../lib/models/Menus.js');

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

  it('Gets all menus', async () => {
    const menus = await Promise.all([
      {
        name: 'get all 1'
      },
      {
        name: 'get all 2'
      },
      {
        name: 'get all 3'
      },
    ].map(menu => Menu.insert(menu)));
    const res = await request(app)
      .get('/menus');
    expect(res.body).toEqual(expect.arrayContaining(menus));
    expect(res.body).toHaveLength(menus.length);
  });

  it('Get by id', async () => {
    const menu = await Menu.insert({ name: 'get by id' });
    const res = await request(app)
      .get(`/menus/${menu.id}`);
    expect(res.body).toEqual({
      id: menu.id,
      name: 'get by id'
    });
  });

  it('Updates a menu', async () => {
    const menu = await Menu.insert({ name: 'update menu time' });
    const res = await request(app)
      .put(`/menus/${menu.id}`)
      .send({
        name: 'updated menu should return'
      });
    expect(res.body).toEqual({
      id: menu.id,
      name: 'updated menu should return'
    });
  });

  it('Removes a Snack by id via DELETE', async () => {
    const menu = await Menu.insert({
      name: 'delete test'
    });
    const res = await request(app)
      .delete(`/menus/${menu.id}`);
    expect(res.body).toEqual({
      id: menu.id,
      name: 'delete test'
    });
  });
});
