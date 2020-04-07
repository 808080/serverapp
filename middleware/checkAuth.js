const jwt = require('jsonwebtoken');
const config = require('../config');


const checkAuth = async (req, res, next) => {
  let token;
  try {
    token = req.headers['authorization'].split(' ')[1];
  } catch {
    return res.sendStatus(403);
  }

  jwt.verify(token, config.jwtKey, (err) => {
    if (err) {
      return res.sendStatus(403);
    }

    next();
  });
}

module.exports = checkAuth;