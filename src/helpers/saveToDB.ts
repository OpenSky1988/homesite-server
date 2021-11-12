import { Document, Response } from 'mongodb';
import stringifyObject from '../helpers/stringifyObject';

type DBSaveResponseBody = {
  success: boolean;
  id: string;
  messahe: string;
} & any;

const saveToDB = (
  res: Response,
  DBEntity: Document & any,
  responseBody: DBSaveResponseBody,
  errMessage: string
) => {
  DBEntity
    .save()
    .then(() => res.status(201).json(responseBody))
    .catch((error: Error) => res.status(400).json({
        error,
        message: `${errMessage}\nError: ${stringifyObject(error)}`,
      })
    );

  // return res.status(400).json({
  //   success: false,
  //   message: 'User not updated!',
  // });

  return -1;
};

export default saveToDB;
