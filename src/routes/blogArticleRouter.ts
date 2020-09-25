import express from 'express';
import {
    createArticle,
    deleteArticle,
    getArticleById,
    getArticles,
    updateArticle,
} from '../controllers/blogArticleController';
import withAuth from '../middleware/index';

const blogArticleRouter = express.Router();

blogArticleRouter.post('/', withAuth, createArticle);
blogArticleRouter.get('/list', withAuth, getArticles);
blogArticleRouter.put('/:id', withAuth, updateArticle);
blogArticleRouter.delete('/:id', withAuth, deleteArticle);
blogArticleRouter.get('/:id', withAuth, getArticleById);

export default blogArticleRouter;