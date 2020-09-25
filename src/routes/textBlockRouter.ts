import express from 'express';
import {
    createTextBlock,
    deleteTextBlock,
    getTextBlockById,
    // getTextBlocks,
    updateTextBlock,
} from '../controllers/textBlockController';
import withAuth from '../middleware/index';

const textBlockRouter = express.Router();

textBlockRouter.post('/', withAuth, createTextBlock);
// textBlockRouter.get('/list', withAuth, getTextBlocks);
textBlockRouter.put('/:id', withAuth, updateTextBlock);
textBlockRouter.delete('/:id', withAuth, deleteTextBlock);
textBlockRouter.get('/:id', withAuth, getTextBlockById);

export default textBlockRouter;
