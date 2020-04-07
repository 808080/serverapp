const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    minlength: 5
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 4
  }
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;