const { User } = require('../db/models/user');
const { hashPassword, generateAuthToken } = require('../utils');
const isValidPass = require('../utils/validation');

const signIn = async (req, res) => {
  try {
    const login = req.body.login;
    const password = hashPassword(req.body.password);

    if (!login || !password) {
      return res.status(404).send('Username and password must be filled in!');
    }

    let user = await User.findOne({ where: { login }, attributes: { include: ['password'] } });
    console.log(user.password);

    if (!user) {
      return res.status(404).send('User doesn\'t exist.');
    }

    if (user.password !== password) {
      return res.status(400).send('Wrong password');
    }
    user = user.toJSON();
    delete user.password;
    const token = await generateAuthToken({ id: user.id });
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const signUp = async (req, res) => {
  try {
    if (!isValidPass(req.body.password)) {
      return res.sendStatus(400);
    }
    const body = { ...req.body };
    body.password = hashPassword(req.body.password);
    let user = await User.create(body);
    user = user.toJSON();
    delete user.password;
    const token = await generateAuthToken({ id: user.id });
    return res.status(200).send({ user, token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send(err.message);
    }
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