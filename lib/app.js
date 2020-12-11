const express = require('express');
const app = express();
const Menu = require('./models/Menus.js');
app.use(express.json());


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
