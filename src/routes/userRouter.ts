import express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.get('/list', userController.getUsers);
userRouter.put('/:id', userController.udateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/auth', userController.authenticateUser);

export default userRouter;
