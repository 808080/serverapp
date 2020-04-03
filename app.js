const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/users', userController.getAll);
app.get('/api/users/:id', userController.getOne);
app.post('/api/users', userController.add);
app.delete('/api/users/:id', userController.remove);
app.patch('/api/users/:id', userController.change);

module.exports = app;