import { Request, Response } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoDB = require('./db');
const articleRouter = require('./routes/blogArticleRouter');
const projectRouter = require('./routes/projectRouter');
const skillRouter = require('./routes/skillRouter');
const textBlockRouter = require('./routes/textBlockRouter');
const userRouter = require('./routes/userRouter');

const app = express();
const apiPort = 3000;
const apiRoot = '/api';
const locale = {
    en: '/en',
    ru: '/ru'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

MongoDB.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get('/', (_req: Request, res: Response) => {
    res.send('Connection successfull. Homesite server is online.');
});

app.use(`${apiRoot}${locale.en}/article`, articleRouter);
app.use(`${apiRoot}${locale.en}/project`, projectRouter);
app.use(`${apiRoot}${locale.en}/skill`, skillRouter);
app.use(`${apiRoot}${locale.en}/year`, textBlockRouter);
app.use(`${apiRoot}${locale.en}/users`, userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
