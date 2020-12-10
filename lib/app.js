const express = require('express');
const app = express();
const placeholder = require('./models/placeholder.js');
app.use(express.json());


// CREATE
app.post('/PLACEHOLDER', (req, res, next) => {
  placeholder
    .insert(req.body)
    .then(place_holder => res.send(place_holder))
    .catch(next);
});

// GET
app.get('/PLACEHOLDER', (req, res, next) => {
  placeholder
    .find()
    .then(place_holder => res.send(place_holder))
    .catch(next);
});
app.get('/PLACEHOLDER/:id', (req, res, next) => {
  placeholder
    .findById(req.params.id)
    .then(place_holder => res.send(place_holder))
    .catch(next);
});

// UPDATE
app.put('/PLACEHOLDER/:id', (req, res, next) => {
  placeholder
    .update(req.params.id, req.body)
    .then(place_holder => res.send(place_holder))
    .catch(next);
});

// DELETE
app.delete('/PLACEHOLDER/:id', (req, res, next) => {
  placeholder
    .delete(req.params.id)
    .then(place_holder => res.send(place_holder))
    .catch(next);
});

module.exports = app;
