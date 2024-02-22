
import express, { Express, Request, Response } from 'express';
import CustomResponse from './utils/response';
import postRouter from './routes/blog';

const app:Express = express();

app.use(express.json());
app.use('/api', postRouter);

app.get('/api/*', (req: Request, res: Response) => {
  const response = new CustomResponse(req, res);
  response.send(null, 'API Not Found', 404);
});

export default app;



