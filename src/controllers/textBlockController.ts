import { Request, Response } from 'express';
import stringifyObject from '../helpers/stringifyObject';
import {ITextBlock, TextBlockType } from '../models/textBlockModel';
import textBlockModel from '../models/textBlockModel';

type TextBlockSchemaType = ITextBlock & { save(): any; };

const createTextBlock = (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an textblock.',
        });
    }

    const textblock = new textBlockModel(body);

    if (!textblock) {
        return res.status(400).json({
            success: false,
            error: 'Wrong textblock data.',
        });
    }
    
    textblock
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: textblock._id,
                message: 'TextBlock created!',
            });
        })
        .catch((error: Error) => {
            return res.status(400).json({
                error,
                message: `TextBlock not created!\nError: ${stringifyObject(error)}`,
            });
        });

    // return res.status(400).json({
    //     success: false,
    //     message: 'Text block not created!',
    // });
    return -1;
};

const updateTextBlock = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
    textBlockModel.findOne({ _id: req.params.id }, (error: Error, textblock: TextBlockSchemaType) => {
        if (error) {
            return res.status(400).json({
                error,
                message: 'Text block not found',
            })
        }

        textblock.text = body.text;
        
        textblock
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: textblock._id,
                    message: 'Text block updated!',
                });
            })
            .catch((error: Error) => {
                return res.status(400).json({
                    error,
                    message: `Text block not updated!\nError: ${stringifyObject(error)}`,
                });
            });

            // return res.status(400).json({
            //     success: false,
            //     message: 'Text block not updated!',
            // });
            return -1;
        });
    
    // return res.status(400).json({
    //     success: false,
    //     message: 'Text block not updated!',
    // });
    return -1;
};

const deleteTextBlock = async (req: Request, res: Response) => {
    await textBlockModel.findOneAndDelete({ _id: req.params.id }, (error: Error, textblock: TextBlockType) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!textblock) {
            return res.status(400).json({ success: false, error: 'Text block not found.' });
        }

        return res.status(200).json({ success: true, payload: textblock });
    }).catch((error: Error) => console.log(`Unable to delete textblock. Error: ${stringifyObject(error)}`));
};

const getTextBlockById = async (req: Request, res: Response) => {
    await textBlockModel.findOne({ _id: req.params.id }, (error: Error, textblock: ITextBlock) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!textblock) {
            return res.status(400).json({ success: false, error: 'Text block not found.' });
        }

        return res.status(200).json({ success: true, payload: textblock });
    }).catch((error: Error) => console.log(`Unable to fetch text block. Error: ${stringifyObject(error)}`));
};

// const getTextBlocks = async (req: Request, res: Response) => {
//     await textBlockModel.find({}, (error: Error, textBlocks: ITextBlock) => {
//         if (error) {
//             return res.status(400).json({ success: false, error: error });
//         }

//         if (!textBlocks) {
//             return res.status(400).json({ success: false, error: 'Text blocks not found.' });
//         }

//         return res.status(200).json({ success: true, payload: textBlocks });
//     }).catch((error: Error) => console.log(`Unable to fetch text blocks. Error: ${stringifyObject(error)}`));
// };

export {
    createTextBlock,
    deleteTextBlock,
    getTextBlockById,
    // getTextBlocks,
    updateTextBlock,
};
