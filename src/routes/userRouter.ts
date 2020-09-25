import express from 'express';
import {
    authenticateUser,
    checkToken,
    deleteUser,
    getUserById,
    getUsers,
    registerUser,
    updateUser,
} from '../controllers/userController';
import withAuth from '../middleware/index';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUser);
userRouter.get('/check-token', withAuth, checkToken);
userRouter.get('/list', withAuth, getUsers);
userRouter.put('/:id', withAuth, updateUser);
userRouter.delete('/:id', withAuth, deleteUser);
userRouter.get('/:id', withAuth, getUserById);

export default userRouter;
