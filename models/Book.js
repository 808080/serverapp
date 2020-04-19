const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  images: {
    type: [String],
    validate: [imgLimit, '4 images max']
  },
  fragment: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  }
}, { versionKey: false });

function imgLimit(val) {
  return val.length <= 4;
}

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;