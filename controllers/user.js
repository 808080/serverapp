const User = require('../models/User');
const { hashPassword } = require('../utils');

const isValidPass = require('../utils/validation');

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

    res.json(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const create = async (req, res) => {
  try {
    if (!isValidPass(req.body.password)) {
      return res.sendStatus(400);
    }
    const body = { ...req.body };
    body.password = hashPassword(req.body.password);
    let user = await new User(body).save();

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
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const update = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send('User is not found');
    const id = req.params.id;
    const body = req.body;

    if (body.password) {
      if (!isValidPass(req.body.password)) {
        return res.sendStatus(400);
      }
      body.password = hashPassword(req.body.password);
    }

    if (req.file) {
      body.avatar = `${req.file.destination}/${req.file.filename}`.substr(1);
    }

    const user = await User.findOneAndUpdate({ _id: id }, body, { new: true });
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