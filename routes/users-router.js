const userRouter = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users-controllers');

userRouter.get('/', getUsers).get('/:username', getUserById);

module.exports = userRouter;
