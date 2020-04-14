const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  dob: {
    type: String
  },
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar:{
    type: String,
  }
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;