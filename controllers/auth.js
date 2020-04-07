const encrypt = require('../utils/encrypter');
const User = require('../models/User');
const generateAuthToken = require('../utils/token');


const login = async (req, res) => {
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
  user = await User.findOne({ login }).select('-password');
  const token = await generateAuthToken(user._id);
  return res.status(200).send({ user, token });
}

const register = (req, res) => {
  //todo
}

module.exports = {
  login,
  register
};