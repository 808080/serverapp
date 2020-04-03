const mongoose = require('mongoose');

const config = require('./config');
const server = require('./app');

mongoose.connect(config.mongoConnection, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err);
});

server.listen(config.port, () => {
  console.log(`Server is listening to ${config.port}`);
});