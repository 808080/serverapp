const Book = require('../models/Book');

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getAll = async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books) {
      return res.sendStatus(404);
    }
    res.json(books);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const create = async (req, res) => {
  try {
    const body = { ...req.body };

    if (req.files) {
      body.images = [];

      for (let i = 0; i < req.files.length; i++) {
        body.images.push(`${req.files[i].destination}/${req.files[i].filename}`.substr(1));
      }
    }

    let book = await new Book(body).save();
    if (!book) {
      return res.status(400).send('Book was not added');
    }
    book = book.toJSON();
    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.sendStatus(404);
    }
    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const update = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send('Book is not found');
    const id = req.params.id;
    const body = req.body;

    if (req.files) {
      body.images = [];

      for (let i = 0; i < req.files.length; i++) {
        body.images.push(`${req.files[i].destination}/${req.files[i].filename}`.substr(1));
      }
    }

    const book = await User.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!book) {
      return res.sendStatus(404);
    }
    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = {
  getOne,
  getAll,
  create,
  remove,
  update
};