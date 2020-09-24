import { Request, Response } from 'express';
import { ArticleType, IArticle } from '../models/blogArticleModel';
import articleModel from '../models/blogArticleModel';

type ArticleSchemaType = IArticle & { save(): any; };

const createArticle = (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an article.',
        });
    }

    const article = new articleModel(body);

    if (!article) {
        return res.status(400).json({
            success: false,
            error: 'Wrong article data.',
        });
    }
    
    article
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: article._id,
                message: 'Article created!',
            });
        })
        .catch((error: Error) => {
            return res.status(400).json({
                error,
                message: `Article not created!\nError: ${JSON.stringify(error, null, '  ')}`,
            });
        });

    // return res.status(400).json({
    //     success: false,
    //     message: 'Article not created!',
    // });
    return -1;
};

const udateArticle = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
    articleModel.findOne({ _id: req.params.id }, (error: Error, article: ArticleSchemaType) => {
        if (error) {
            return res.status(400).json({
                error,
                message: 'Article not found',
            })
        }

        article.date = body.date;
        article.header = body.header;
        article.id = body.id;
        article.img = body.img;
        article.text = body.text;
        
        article
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: article._id,
                    message: 'Article updated!',
                });
            })
            .catch((error: Error) => {
                return res.status(400).json({
                    error,
                    message: `Article not updated!\nError: ${JSON.stringify(error, null, '  ')}`,
                });
            });

            // return res.status(400).json({
            //     success: false,
            //     message: 'Article not updated!',
            // });
            return -1;
        });
    
    // return res.status(400).json({
    //     success: false,
    //     message: 'Article not updated!',
    // });
    return -1;
};

const deleteArticle = async (req: Request, res: Response) => {
    await articleModel.findOneAndDelete({ _id: req.params.id }, (error: Error, article: ArticleType) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!article) {
            return res.status(400).json({ success: false, error: 'Article not found.' });
        }

        return res.status(200).json({ success: true, data: article });
    }).catch((error: Error) => console.log(`Unable to delete article. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getArticleById = async (req: Request, res: Response) => {
    await articleModel.findOne({ _id: req.params.id }, (error: Error, article: IArticle) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!article) {
            return res.status(400).json({ success: false, error: 'Article not found.' });
        }

        return res.status(200).json({ success: true, data: article });
    }).catch((error: Error) => console.log(`Unable to fetch article. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getArticles = async (req: Request, res: Response) => {
    await articleModel.find({}, (error: Error, articles: IArticle) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!articles) {
            return res.status(400).json({ success: false, error: 'Articles not found.' });
        }

        return res.status(200).json({ success: true, data: articles });
    }).catch((error: Error) => console.log(`Unable to fetch articles. Error: ${JSON.stringify(error, null, '  ')}`));
};

export {
    createArticle,
    udateArticle,
    deleteArticle,
    getArticleById,
    getArticles
};
