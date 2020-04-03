const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  userController.getAll(req, res);
});
app.get('/api/users/:id', (req, res) => {
  userController.getOne(req, res);
});
app.post('/api/users', (req, res) => {
  userController.add(req, res);
});
app.delete('/api/users/:id', (req, res) => {
  userController.remove(req, res);
});
app.patch('/api/users/:id', (req, res) => {
  userController.change(req, res);
});

module.exports = app;