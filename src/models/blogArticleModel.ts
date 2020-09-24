import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';

interface IArticle {
  _id: number;
  date: string;
  header: string;
  id: string | null;
  img: string;
  text: string;
};

type ArticleType = IArticle & Document;

const BlogArticleSchema = new Schema({
  date: { type: String, required: true },
  header: { type: String, required: true },
  id: { type: String, required: true },
  img: { type: String, required: true },
  text: { type: String, required: true },
}, {
  timestamps: true
});

const articleModel = mongoose.model('BlogArticle', BlogArticleSchema);

export { ArticleType, IArticle };
export default articleModel;
