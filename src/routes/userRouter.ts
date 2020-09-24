import express from 'express';
import * as userController from '../controllers/userController';
import withAuth from '../middleware/index';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/auth', userController.authenticateUser);
userRouter.get('/check-token', withAuth, userController.checkToken);
userRouter.get('/list', userController.getUsers);
userRouter.put('/:id', userController.udateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/:id', userController.getUserById);

export default userRouter;
