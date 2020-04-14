export {};
const express = require('express');
const userController = require('../controllers/userController');
const withAuth = require('../middleware/index.jsx');

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/auth', userController.authenticateUser);
userRouter.get('/check-token', withAuth, userController.checkToken);
userRouter.get('/list', userController.getUsers);
userRouter.put('/:id', userController.udateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/:id', userController.getUserById);

module.exports = userRouter;
