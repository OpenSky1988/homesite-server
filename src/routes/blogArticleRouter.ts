import express from 'express';
import * as blogArticleController from '../controllers/blogArticleController';

const blogArticleRouter = express.Router();

blogArticleRouter.post('/', blogArticleController.createArticle);
blogArticleRouter.get('/list', blogArticleController.getArticles);
blogArticleRouter.put('/:id', blogArticleController.udateArticle);
blogArticleRouter.delete('/:id', blogArticleController.deleteArticle);
blogArticleRouter.get('/:id', blogArticleController.getArticleById);

export default blogArticleRouter;