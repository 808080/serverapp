const jwt = require('jsonwebtoken');
const config = require('../config');

generateAuthToken = (data) => {
  return jwt.sign(data, config.jwtKey);
}

module.exports = generateAuthToken;