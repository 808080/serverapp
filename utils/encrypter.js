const crypto = require('crypto');
const config = require('../config');

const hash = (password) => {
  return crypto.createHmac(config.hashType, config.hashKey).update(password).digest('hex');
};

module.exports = hash;