import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import respondWithError from '../helpers/respondWithError';
import saveToDB from '../helpers/saveToDB';
import stringifyObject from '../helpers/stringifyObject';
import userModel, { IUser, UserType } from '../models/userModel';

type UserSchemaType = IUser & { save(): any; };

const registerUser = (req: Request, res: Response) => {
  const { body } = req;

  if (!body) {
    return respondWithError(res, 'You must provide a user.');
  }

  const user = new userModel(body);

  if (!user) {
    return respondWithError(res, 'Wrong user data.');
  }


  userModel.findOne({ _id: req.params.email }, (error: Error, existingUser: IUser) => {
    if (error) {
      return res.status(400).json({ success: false, error: error });
    }

    if (!existingUser) {
      return saveToDB(res, user, {
        active: true,
        email: user.email,
        id: user._id,
        message: 'User created!',
        password: user.password,
        success: true,
      },
      'User not created!');
    }

    return res.status(400).json({ success: false, payload: user });
  }).catch((error: Error) => console.log(`Unable to fetch user. Error: ${stringifyObject(error)}`));
};

const updateUser = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return respondWithError(res, 'You must provide a body to update');
  }

  userModel.findOne({ _id: req.params.id }, (error: Error, user: UserSchemaType) => {
    if (error) {
      return respondWithError(res, 'User not found');
    }

    const { email, password, active } = body;

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (active) {
      user.active = active;
    }

    return saveToDB(res, user, {
      success: true,
      id: user._id,
      message: 'User updated!',
    },
    'User not updated!');
  });

  // return res.status(400).json({
  //   success: false,
  //   message: 'User not updated!',
  // });
  return -1;
};

const deleteUser = async (req: Request, res: Response) => {
  await userModel.findOneAndDelete({ _id: req.params.id }, (error: Error, user: UserType) => {
    if (error) {
      return respondWithError(res, stringifyObject(error));
    }

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found.' });
    }

    return res.status(200).json({ success: true, payload: user });
  }).catch((error: Error) => console.log(`Unable to delete user. Error: ${stringifyObject(error)}`));
};

const getUserById = async (req: Request, res: Response) => {
  await userModel.findOne({ _id: req.params.id }, (error: Error, user: IUser) => {
    if (error) {
      return respondWithError(res, stringifyObject(error));
    }

    if (!user) {
      return respondWithError(res, 'User not found.');
    }

    return res.status(200).json({ success: true, payload: user });
  }).catch((error: Error) => console.log(`Unable to fetch user. Error: ${stringifyObject(error)}`));
};

const getUsers = async (_req: Request, res: Response) => {
  await userModel.find({}, (error: Error, users: IUser) => {
    if (error) {
      return respondWithError(res, stringifyObject(error));
    }

    if (!users) {
      return respondWithError(res, 'Users not found.');
    }

    return res.status(200).json({ success: true, payload: users });
  }).catch((error: Error) => console.log(`Unable to fetch users. Error: ${stringifyObject(error)}`));
};

const authenticateUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  userModel.findOne({ email }, function (error: Error, user) {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal error. Please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function (error: Error, same: Boolean) {
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
            expiresIn: '1h'
          });

          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
            .sendStatus(200);
        }
      });
    }
  });

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
  updateUser,
};
