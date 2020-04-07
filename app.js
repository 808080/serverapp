const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const userAuth = require('./controllers/auth');
const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/sign-in", userAuth.login);

app.use(checkAuth);

app.get('/api/users', userController.getAll);
app.get('/api/users/:id', userController.getOne);
app.post('/api/users', userController.add);
app.patch('/api/users/:id', userController.change);
app.delete('/api/users/:id', userController.remove);


module.exports = app;