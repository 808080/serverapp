const encrypt = require('../utils/encrypter');
const User = require('../models/User');
const generateAuthToken = require('../utils/token');


const signIn = async (req, res) => {
  const login = req.body.login;
  const password = encrypt(req.body.password);

  if (!login || !password) {
    return res.status(404).send('Username and password must be filled in!');
  }

  let user = await User.findOne({ login }).select('+password');
  if (!user) {
    return res.status(404).send('User doesn\'t exist.');
  }

  if (user.password !== password) {
    return res.status(400).send('Wrong password');
  }
  user = user.toJSON();
  delete user.password;
  const token = await generateAuthToken({id: user._id});
  return res.status(200).send({ user, token });
}

const signUp = async (req, res) => {
  if (!req.body) return res.status(400).send('Invalid user data');
  req.body.password = encrypt(req.body.password);
  const { ...values } = req.body;
  let user = await new User({ ...values }).save();

  if (!user) {
    return res.status(400).send('User was not added');
  }
  user = user.toJSON();
  delete user.password;
  const token = await generateAuthToken({id: user._id});
  return res.status(200).send({ user, token });
}

const authorize = (req, res) => {
  const user = req.user.toJSON();
  delete user.password;
  res.json(user);
}

module.exports = {
  signIn,
  signUp,
  authorize
};