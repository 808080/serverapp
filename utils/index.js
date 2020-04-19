const jwt = require('jsonwebtoken');
const config = require('../config');
const crypto = require('crypto');

const generateAuthToken = (data) => {
  return jwt.sign(data, config.jwtKey);
}

const hash = (password) => {
  return crypto.createHmac(config.hashType, config.hashKey).update(password).digest('hex');
};

module.exports = { 
  hash,
  generateAuthToken
};