/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите url',
    },
  },
  owner: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  likes: {
    type: [{
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    }],
    default: [],
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
