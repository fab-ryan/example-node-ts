import express, { Express, Request, Response } from 'express';
import CustomResponse from './utils/response';
import postRouter from './routes/blog';

import dotenv from 'dotenv';

// 90% or 100% coverage

dotenv.config();
import databaseConnection from './config/db';

const app: Express = express();

app.use(express.json());
app.use('/api', postRouter);

app.get('/api/*', (req: Request, res: Response) => {
  const response = new CustomResponse(req, res);
  response.send(null, 'API Not Found', 404);
});

databaseConnection();

export default app;