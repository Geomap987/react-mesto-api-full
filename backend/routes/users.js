/* eslint-disable linebreak-style */
const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateUserNameRequest, updateUserAvatarRequest } = require('../middlewares/request-validation');

const {
  getUsers, getUserById, getUserMe, updateUserName, updateUserAvatar,
} = require('../controllers/user');

router.get('/users/me', getUserMe);

router.get('/users/:id', getUserById);

router.get('/users', getUsers);

router.patch('/users/me', celebrate(updateUserNameRequest), updateUserName);

router.patch('/users/me/avatar', celebrate(updateUserAvatarRequest), updateUserAvatar);

module.exports = router;
