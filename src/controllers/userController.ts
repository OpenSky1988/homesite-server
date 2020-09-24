import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel, { IUser, UserType } from '../models/userModel';

type UserSchemaType = IUser & { save(): any; };

const registerUser = (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user.',
        });
    }

    const user = new userModel(body);

    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'Wrong user data.',
        });
    }
    
    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                email: user.email,
                password: user.password,
                message: 'User created!',
            });
        })
        .catch((error: Error) => {
            return res.status(400).json({
                error,
                message: `User not created!\nError: ${JSON.stringify(error, null, '  ')}`,
            });
        });

    // return res.status(400).json({
    //     success: false,
    //     message: 'User not created!',
    // });
    return -1;
};

const udateUser = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
    userModel.findOne({ _id: req.params.id }, (error: Error, user: UserSchemaType) => {
        if (error) {
            return res.status(400).json({
                error,
                message: 'User not found',
            })
        }

        user.email = body.email;
        user.password = body.email;
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                });
            })
            .catch((error: Error) => {
                return res.status(400).json({
                    error,
                    message: `User not updated!\nError: ${JSON.stringify(error, null, '  ')}`,
                });
            });

            // return res.status(400).json({
            //     success: false,
            //     message: 'User not updated!',
            // });
            return -1;
        });
    
    // return res.status(400).json({
    //     success: false,
    //     message: 'User not updated!',
    // });
    return -1;
};

const deleteUser = async (req: Request, res: Response) => {
    await userModel.findOneAndDelete({ _id: req.params.id }, (error: Error, user: UserType) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found.' });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch((error: Error) => console.log(`Unable to delete user. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getUserById = async (req: Request, res: Response) => {
    await userModel.findOne({ _id: req.params.id }, (error: Error, user: IUser) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found.' });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch((error: Error) => console.log(`Unable to fetch user. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getUsers = async (req: Request, res: Response) => {
    await userModel.find({}, (error: Error, users: IUser) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!users) {
            return res.status(400).json({ success: false, error: 'Users not found.' });
        }

        return res.status(200).json({ success: true, data: users });
    }).catch((error: Error) => console.log(`Unable to fetch users. Error: ${JSON.stringify(error, null, '  ')}`));
};

const authenticateUser = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokenDuration = '1h';
    
    userModel.findOne({ email }, function(error: Error, user) {
        if (error) {
        console.error(error);
        res.status(500)
            .json({
            error: 'Internal error please try again'
        });
    } else if (!user) {
        res.status(401)
            .json({
                error: 'Incorrect email or password'
            });
    } else {
        user.isCorrectPassword(password, function(error: Error, same: Boolean) {
            if (error) {
                res.status(500).json({
                    error: 'Internal error please try again'
                });
            } else if (!same) {
                res.status(401).json({
                    error: 'Incorrect email or password'
                });
            } else {
                // Issue token
                const payload = { email };
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: tokenDuration
                });
                res.cookie('token', token, { httpOnly: true }).sendStatus(200);
            }
        });
    }});
  return -1;
};



const checkToken = (_req, res) => {
    res.sendStatus(200);
};

const secret = (_req, res) => {
    res.send('The password is potato');
};

export {
    authenticateUser,
    checkToken,
    deleteUser,
    getUserById,
    getUsers,
    registerUser,
    secret,
    udateUser
};
