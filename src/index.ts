import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();

import MongoDB from './db';
import articleRouter from './routes/blogArticleRouter';
import projectRouter from './routes/projectRouter';
import skillRouter from './routes/skillRouter';
import textBlockRouter from './routes/textBlockRouter';
import userRouter from './routes/userRouter';

const app = express();

const apiConfig = {
    apiPort: 8090,
    apiRoot: '/api',
    locale: {
        en: '/en',
        ru: '/ru'
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

MongoDB.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get('/', (_req: Request, res: Response) => {
    res.send('Connection successfull. Homesite server is online.');
});

app.use(`${apiConfig.apiRoot}${apiConfig.locale.en}/article`, articleRouter);
app.use(`${apiConfig.apiRoot}${apiConfig.locale.en}/project`, projectRouter);
app.use(`${apiConfig.apiRoot}${apiConfig.locale.en}/skill`, skillRouter);
app.use(`${apiConfig.apiRoot}${apiConfig.locale.en}/year`, textBlockRouter);
app.use(`${apiConfig.apiRoot}${apiConfig.locale.en}/users`, userRouter);

app.listen(apiConfig.apiPort, () => console.log(`Server running on port ${apiConfig.apiPort}`));
