import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import articlesRoute from './routes/articles';
import tokensRoute from './routes/tokens';

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' },
);
app.use(morgan('dev', { stream: accessLogStream }));

app.use(express.json());

app.use(cors());

app.use('/articles', articlesRoute);
app.use('/tokens', tokensRoute);

export default app;
