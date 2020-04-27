const { User } = require('../db/models');
const { hashPassword } = require('../utils');

const isValidLength = require('../utils/validation');

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
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
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const create = async (req, res) => {
  try {
    if (!isValidLength(req.body.password)) {
      return res.sendStatus(400);
    }
    const body = { ...req.body };
    body.password = hashPassword(req.body.password);
    let user = await User.create(body);

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
    const user = await User.destroy({ where: { id } });
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
      if (!isValidLength(req.body.password)) {
        return res.sendStatus(400);
      }
      body.password = hashPassword(req.body.password);
    }

    if (body.login) {
      if (!isValidLength(req.body.login)) {
        return res.sendStatus(400);
      }
    }

    if (req.file) {
      body.avatar = `${req.file.destination}/${req.file.filename}`.substr(1);
    }

    const [,user] = await User.update(body, {
      where: { id },
      returning: true,
      plain: true,
      raw: true
    });

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