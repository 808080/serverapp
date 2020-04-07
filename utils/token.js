const jwt = require('jsonwebtoken');
const config = require('../config');

generateAuthToken = (id) => {
  return jwt.sign({ _id: id }, config.jwtKey);
}

module.exports = generateAuthToken;