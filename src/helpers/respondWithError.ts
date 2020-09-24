import { Response } from 'express';

const respondWithError = (res: Response, errDescription: string) => {
    return res.status(400).json({
        success: false,
        error: errDescription,
    });
}

export default respondWithError;
