const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dob: {
    type: Date
  },
  login: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 4
  }
}, { versionKey: false });

const User = mongoose.model("User", userScheme);

module.exports = User;