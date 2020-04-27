const fs = require('fs');
const { Book } = require('../db/models');
const { Op } = require("sequelize");

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
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
    const order = req.query.order || 'ASC';
    const maxPrice = +req.query.maxPrice || Infinity;
    const minPrice = +req.query.minPrice || 0;
    const searchReq = { [Op.iLike]: `%${req.query.search}%` };

    let where = {
      price: {
        [Op.lte]: maxPrice,
        [Op.gte]: minPrice
      }
    }
    if (req.query.search) {
      where[Op.or] = [
        { title: searchReq },
        { author: searchReq },
        { description: searchReq },
        { fragment: searchReq }
      ]
    }

    const searchParams = {
      order: [['title', order]],
      limit: perPage,
      offset: perPage * (page - 1),
      where
    };

    const { rows: data, count: total } = await Book.findAndCountAll(searchParams);

    res.json({ total, data });
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

    const book = await Book.create(body);

    res.json(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.destroy({ where: { id } });
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

    const [, book] = await Book.update(body, {
      where: { id },
      returning: true,
      plain: true,
      raw: true
    });

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