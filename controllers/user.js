const User = require('../models/User');
const encrypt = require('../utils/encrypter');

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.sendStatus(404);
    }
    res.json(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const create = async (req, res) => {
  try {
    const body = req.body;
    body.password = encrypt(req.body.password);
    const { ...values } = body;
    let user = await new User({ ...values }).save();

    if (!user) {
      return res.status(400).send('User was not added');
    }
    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const update = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send('User is not found');
    const id = req.params.id;
    const body = req.body;
    body.password = encrypt(req.body.password);
    const { ...newValues } = body;

    const user = await User.findOneAndUpdate({ _id: id }, { ...newValues }, { new: true });
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = {
  getOne,
  getAll,
  create,
  remove,
  update
};