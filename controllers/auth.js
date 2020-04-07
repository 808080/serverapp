const encrypt = require('../utils/encrypter');
const User = require('../models/User');
const generateAuthToken = require('../utils/token');


const signIn = async (req, res) => {
  try {
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
    const token = await generateAuthToken({ id: user._id });
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const signUp = async (req, res) => {
  try {
    const body = req.body;
    body.password = encrypt(req.body.password);
    const { ...values } = body;
    let user = await User.create({ ...values });
    if (!user) {
      return res.status(400).send('User was not added');
    }
    user = user.toJSON();
    delete user.password;
    const token = await generateAuthToken({ id: user._id });
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const authorize = (req, res) => {
  try {
    const user = req.user.toJSON();
    delete user.password;
    return res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = {
  signIn,
  signUp,
  authorize
};