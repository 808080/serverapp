const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const userAuth = require('./controllers/auth');
const checkAuth = require('./middleware/checkAuth');
const imageUpload = require('./middleware/imageUpload');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  next();
});

app.use('/public', express.static('public'));

app.post("/auth/sign-in", userAuth.signIn);
app.post("/auth/sign-up", userAuth.signUp);

app.get("/auth", checkAuth, userAuth.authorize);
app.get('/api/users', checkAuth, userController.getAll);
app.get('/api/users/:id', checkAuth, userController.getOne);
app.post('/api/users', checkAuth, userController.create);
app.patch('/api/users/:id', checkAuth, imageUpload, userController.update);
app.delete('/api/users/:id', checkAuth, userController.remove);


module.exports = app;