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
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
}, { versionKey: false });

const User = mongoose.model("User", userScheme);


const userController = {
  getOne: (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
      if (err) {
        res.send(err.message);
        return console.log(err);
      }
      res.send(user);
    });
  },
  getAll: (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err.message);
        return console.log(err);
      }
      res.send(user);
    });
  },
  add: (req, res) => {
    if (!req.body) return res.status(400).send('Invalid user data');
    const { ...values } = req.body;
    const user = new User({ ...values });

    user.save((err) => {
      if (err) {
        res.send(err.message);
        return console.log(err);
      }
      res.send(user);
    });
  },
  remove: (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
      if (err) {
        res.send(err.message);
        return console.log(err);
      }
      res.send(user);
    });
  },
  change: (req, res) => {
    if (!req.params.id) return res.status(400).send('User is not found');
    const id = req.params.id;
    const { ...values } = req.body;
    const updatedUser = new User({ ...values });

    User.findOneAndUpdate({ _id: id }, updatedUser, { new: true }, (err, user) => {
      if (err) {
        res.send(err.message);
        return console.log(err);
      }
      res.send(user);
    });
  }
}

module.exports = userController;