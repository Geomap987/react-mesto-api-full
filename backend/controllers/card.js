/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const Card = require('../models/card');
const Error400 = require('../errors/Error400');
const Error404 = require('../errors/Error404');
const Error500 = require('../errors/Error500');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      const error500 = new Error500('Ошибка чтения файла');
      next(error500);
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => {
      if (!card) {
        const error404 = new Error404('Нет карточки с таким id');
        next(error404);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === undefined) {
        const error404 = new Error404('Нет карточки с таким id');
        next(error404);
      } if (err.kind === 'ObjectId') {
        const error400 = new Error400('Неправильный id');
        next(error400);
      }
      const error500 = new Error500('Ошибка на сервере');
      next(error500);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { id } = req.user;
  Card.create({
    name,
    link,
    owner: { _id: id },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        const error400 = new Error400(`Ошибка валидации: ${messages.join(' ')}`);
        next(error400);
      } else {
        const error500 = new Error500('Ошибка на сервере');
        next(error500);
      }
    });
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { id } = req.user;
  Card.findByIdAndUpdate({ _id: cardId }, {
    $addToSet: {
      likes: { _id: id },
    },
  }, { new: true })
    .populate('likes')
    .then((card) => {
      if (!card) {
        const error404 = new Error404('Нет карточки с таким id');
        next(error404);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error400 = new Error400('Неправильный id');
        next(error400);
      }
      const error500 = new Error500('Ошибка на сервере');
      next(error500);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { id } = req.user;
  Card.findByIdAndUpdate({ _id: cardId }, {
    $pull: {
      likes: { _id: id },
    },
  }, { new: true })
    .then((card) => {
      if (!card) {
        const error404 = new Error404('Нет карточки с таким id');
        next(error404);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error400 = new Error400('Неправильный id');
        next(error400);
      }
      const error500 = new Error500('Ошибка на сервере');
      next(error500);
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  addLike,
  deleteLike,
};
