const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = await jwt.verify(token, config.jwtKey);
    const user = await User.findById(id);
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  };
};

module.exports = checkAuth;