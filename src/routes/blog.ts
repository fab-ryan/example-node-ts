import express, { IRouter } from 'express';
import { PostController } from '../controller/PostController';
import { CheckUserAuth, CheckUserRole } from '../middleware/auth';

const route: IRouter = express.Router();

route.get('/posts', new PostController().GetAllPosts);
route.post(
  '/posts',
  CheckUserAuth,
  CheckUserRole,
  new PostController().CreatePost,
);
route.get('/posts/:id', new PostController().GetSinglePost);

route.get(
  '/posts/:id/comments',
  CheckUserAuth,
  new PostController().GetAllComments,
);
route.post('/posts/:id/comments', new PostController().CreateComment);

export default route;
