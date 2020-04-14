const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const userAuth = require('./controllers/auth');
const checkAuth = require('./middleware/checkAuth');
const avatarUpload = require('./middleware/avatarUpload');
const bookImgUpload = require('./middleware/bookImgUpload');

const bookController = require('./controllers/book');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  next();
});

app.use(express.static(__dirname));

app.post("/auth/sign-in", userAuth.signIn);
app.post("/auth/sign-up", userAuth.signUp);

app.get('/api/books', bookController.getAll);
app.get('/api/books/:id', bookController.getOne);

app.get("/auth", checkAuth, userAuth.authorize);
app.get('/api/users', checkAuth, userController.getAll);
app.get('/api/users/:id', checkAuth, userController.getOne);
app.post('/api/users', checkAuth, userController.create);
app.patch('/api/users/:id', checkAuth, avatarUpload, userController.update);
app.delete('/api/users/:id', checkAuth, userController.remove);

app.post('/api/books', checkAuth, bookImgUpload, bookController.create);
app.patch('/api/books/:id', checkAuth, bookImgUpload, bookController.update);
app.delete('/api/books/:id', checkAuth, bookController.remove);


module.exports = app;