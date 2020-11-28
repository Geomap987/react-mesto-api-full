/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Error400 = require('../errors/Error400');
const Error401 = require('../errors/Error401');
const Error404 = require('../errors/Error404');
const Error500 = require('../errors/Error500');
const { SALT_ROUND, JWT_SECRET } = require('../configs');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      const error500 = new Error500('Ошибка чтения файла');
      next(error500);
    });
};

const getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user.id })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      res.status(200).send(user);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error400 = new Error400('Неправильный id');
        next(error400);
      }
      const error500 = new Error500('Ошибка на сервере');
      next(error500);
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    // eslint-disable-next-line consistent-return
    .orFail(() => {
      const error404 = new Error404('Не найден');
      next(error404);
    })
    .then((user) => {
      res.send(user);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        const error400 = new Error400('Неправильный id');
        next(error400);
      }
      const error500 = new Error500('Ошибка на сервере');
      next(error500);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      const error400 = new Error400('Юзер с таким емейлом уже есть');
      next(error400);
    }
    bcrypt.hash(password, SALT_ROUND).then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
      .then((data) => res.send({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        email: data.email,
      }))
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
  }).catch(() => {
    const error500 = new Error500('Ошибка на сервере');
    next(error500);
  });
};

// eslint-disable-next-line consistent-return
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error400 = new Error400('Не введен емейл или пароль');
    next(error400);
  }
  // eslint-disable-next-line consistent-return
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      const error401 = new Error401('Нет юзера с таким емейлом');
      next(error401);
    }
    // eslint-disable-next-line consistent-return
    bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        return res.send({ token });
      }
      const error401 = new Error401('Неправильный пароль');
      next(error401);
    });
  }).catch((err) => {
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

function updateUserName(req, res, next) {
  const { name, about } = req.body;
  const { id } = req.user;
  User.findByIdAndUpdate(id, { name, about }, {
    runValidators: true,
    new: true,
  })
    // .then((data) => res.send(data))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        const error400 = new Error400(`Ошибка валидации: ${messages.join(' ')}`);
        next(error400);
      } else if (err.reason === null) {
        const error400 = new Error400('Неподходящий тип данных');
        next(error400);
      } else {
        const error500 = new Error500('Ошибка на сервере');
        next(error500);
      }
    });
}

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { id } = req.user;
  User.findByIdAndUpdate(id, { avatar }, {
    runValidators: true,
    new: true,
  })
    // .then((data) => res.send(data))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        const error400 = new Error400(`Ошибка валидации: ${messages.join(' ')}`);
        next(error400);
      } else if (err.reason === null) {
        const error400 = new Error400('Неподходящий тип данных');
        next(error400);
      } else {
        const error500 = new Error500('Ошибка на сервере');
        next(error500);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  loginUser,
  updateUserName,
  updateUserAvatar,
};
