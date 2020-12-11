const express = require('express');
const app = express();
const Menu = require('./models/Menus.js');
const Restaurant = require('./models/Restaurants.js');
app.use(express.json());

// CREATE
app.post('/restaurants', (req, res, next) => {
  Restaurant
    .insert(req.body)
    .then(restaurant => res.send(restaurant))
    .catch(next);
});

// GET
app.get('/restaurants', (req, res, next) => {
  Restaurant
    .find()
    .then(restaurant => res.send(restaurant))
    .catch(next);
});
app.get('/restaurants/:id', (req, res, next) => {
  Restaurant
    .findById(req.params.id)
    .then(restaurant => res.send(restaurant))
    .catch(next);
});

// UPDATE
app.put('/restaurants/:id', (req, res, next) => {
  Restaurant
    .update(req.params.id, req.body)
    .then(restaurant => res.send(restaurant))
    .catch(next);
});

// DELETE
app.delete('/restaurants/:id', (req, res, next) => {
  Restaurant
    .delete(req.params.id)
    .then(restaurant => res.send(restaurant))
    .catch(next);
});


// CREATE
app.post('/menus', (req, res, next) => {
  Menu
    .insert(req.body)
    .then(menu => res.send(menu))
    .catch(next);
});

// GET
app.get('/menus', (req, res, next) => {
  Menu
    .find()
    .then(menu => res.send(menu))
    .catch(next);
});
app.get('/menus/:id', (req, res, next) => {
  Menu
    .findById(req.params.id)
    .then(menu => res.send(menu))
    .catch(next);
});

// UPDATE
app.put('/menus/:id', (req, res, next) => {
  Menu
    .update(req.params.id, req.body)
    .then(menu => res.send(menu))
    .catch(next);
});

// DELETE
app.delete('/menus/:id', (req, res, next) => {
  Menu
    .delete(req.params.id)
    .then(menu => res.send(menu))
    .catch(next);
});

module.exports = app;
