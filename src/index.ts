import express, { Express, Request, Response } from 'express';
import CustomResponse from './utils/response';
import postRouter from './routes/post';

import dotenv from 'dotenv';

dotenv.config();
import databaseConnection from './config/db';

const app: Express = express();



app.use(express.json());
app.use('/api/posts', postRouter);

app.get('/api/*', (req: Request, res: Response) => {
  const response = new CustomResponse(req, res);
  response.send(null, 'API Not Found', 404);
});

databaseConnection();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
