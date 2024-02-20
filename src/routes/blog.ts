import express, { IRouter } from 'express';
import { PostController } from '../controller/PostController';
import { CheckUserAuth, CheckUserRole } from '../middleware/auth';
// passport js , strategy-jwt, secret, verify, password, incrypted( bcypt, compare, genSalt=10) testing jest, super test , supertest typescript 


const route: IRouter = express.Router();

route.get(
  '/posts',
  CheckUserAuth,
  CheckUserRole,
  new PostController().GetAllPosts,
);
route.post('/posts', new PostController().CreatePost);
route.get('/posts/:id', new PostController().GetSinglePost);

// implementation of comments on single

route.get('/posts/:id/comments', CheckUserAuth,new PostController().GetAllComments);
route.post('/posts/:id/comments', new PostController().CreateComment);

export default route;
