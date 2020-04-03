const _defaultsDeep = require('lodash/defaultsDeep');
const defaultsConfig = require('./defaultConfig.json');
const env = process.env.NODE_ENV || 'development';
let localConfig;
try {
  localConfig = require('./localConfig.json');
} catch (err) {
  localConfig = {};
  console.error('Local config not found');
}
const config = _defaultsDeep(localConfig, defaultsConfig);
module.exports = config[env];