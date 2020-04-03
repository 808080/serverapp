const User = require('../models/User');

const getOne = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  res.json(user)
}

const getAll = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.sendStatus(404);
  }
  res.json(users);
}

const add = async (req, res) => {
  if (!req.body) return res.status(400).send('Invalid user data');
  const { ...values } = req.body;
  const user = await new User({ ...values }).save();

  if (!user) {
    return res.status(400).send('User was not added');
  }
  res.json(user);
}

const remove = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.sendStatus(404);
  }
  res.json(user);
}

const change = async (req, res) => {
  if (!req.params.id) return res.status(400).send('User is not found');
  const id = req.params.id;
  const { ...newValues } = req.body;

  const user = await User.findOneAndUpdate({ _id: id }, { ...newValues }, { new: true });
  if (!user) {
    return res.sendStatus(404);
  }
  res.json(user);
}

module.exports = {
  getOne,
  getAll,
  add,
  remove,
  change
};