/* eslint-disable linebreak-style */
const validator = require('validator');

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: false,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /[a-zA-ZА-ЯЁа-яё\s\d\-]+/.test(v);
      },
      message: 'Введите имя',
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: false,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /[a-zA-ZА-ЯЁа-яё\s\d\-]+/.test(v);
      },
      message: 'Введите описание',
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('user', userSchema);
