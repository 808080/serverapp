const Book = require('../models/Book');
const fs = require('fs');

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.sendStatus(404);
    }
    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getAll = async (req, res) => {
  try {
    const perPage = +req.query.perPage || 5;
    const page = +req.query.page || 1;
    const order = +req.query.order || 1;
    const maxPrice = +req.query.maxPrice || Infinity;
    const minPrice = +req.query.minPrice || 0;

    let searchParams = { price: { $lte: maxPrice, $gte: minPrice } };
    if (req.query.search) {
      const searchReq = { $regex: req.query.search, $options: 'i' };
      searchParams = {
        $or: [
          { title: searchReq },
          { author: searchReq },
          { description: searchReq },
          { fragment: searchReq }
        ],
        $and: [{ price: { $lte: maxPrice, $gte: minPrice } }]
      };
    }

    const books = await Book.find(searchParams)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({ title: order });
    const booksTotal = await Book.countDocuments(searchParams);

    res.json({ booksTotal, books });
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

    const book = await new Book(body).save();

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
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        body.images.push(`${req.files[i].destination}/${req.files[i].filename}`.substr(1));
      }
    }

    if (req.query.imgInd >= 0) {
      const index = +req.query.imgInd;
      const [deletedImg] = body.images.splice(index, 1);

      fs.unlink(process.cwd() + deletedImg, (err) => {
        if (err) throw err;
      });
    }

    const book = await Book.findOneAndUpdate({ _id: id }, body, { new: true });
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