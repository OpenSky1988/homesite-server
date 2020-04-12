import { Document, Schema } from 'mongoose';
const mongoose = require('mongoose');

interface ITextBlock {
    _id: number;
    text: string;
};

type TextBlockType = ITextBlock & Document;

const TextBlockSchema = new Schema({
    text: { type: String, required: true }
});

const textBlockModel = mongoose.model('TextBlockModel', TextBlockSchema);

export { ITextBlock, TextBlockType };
module.exports = textBlockModel;
