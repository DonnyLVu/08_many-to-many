const fs = require('fs');
const pool = require('../lib/utils/pool.js');
// const request = require('supertest');
// const app = require('../lib/app.js');

describe('PLACEHOLDER', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });


});
