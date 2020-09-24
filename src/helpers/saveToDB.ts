import { Response } from 'mongodb';
import stringifyObject from '../helpers/stringifyObject';

const saveToDB = (res: Response, DBEntity, response, errMessage: string) => {
    DBEntity
        .save()
        .then(() => res.status(201).json(response))
        .catch((error: Error) => res.status(400).json({
                error,
                message: `${errMessage}\nError: ${stringifyObject(error)}`,
            })
        );

    // return res.status(400).json({
    //     success: false,
    //     message: 'User not updated!',
    // });
    return -1;
}

export default saveToDB;