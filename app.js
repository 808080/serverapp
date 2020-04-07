const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const userAuth = require('./controllers/auth');
const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth/sign-in", userAuth.signIn);
app.post("/auth/sign-up", userAuth.signUp);

app.use(checkAuth);

app.get("/auth", userAuth.authorize)
app.get('/api/users', userController.getAll);
app.get('/api/users/:id', userController.getOne);
app.post('/api/users', userController.add);
app.patch('/api/users/:id', userController.change);
app.delete('/api/users/:id', userController.remove);


module.exports = app;