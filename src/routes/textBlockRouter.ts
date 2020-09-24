import express from 'express';
import * as textBlockController from '../controllers/textBlockController';

const textBlockRouter = express.Router();

textBlockRouter.post('/', textBlockController.createTextBlock);
// textBlockRouter.get('/list', textBlockController.getTextBlocks);
textBlockRouter.put('/:id', textBlockController.udateTextBlock);
textBlockRouter.delete('/:id', textBlockController.deleteTextBlock);
textBlockRouter.get('/:id', textBlockController.getTextBlockById);

export default textBlockRouter;
