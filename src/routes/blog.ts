import express, { IRouter } from 'express';
import { PostController } from '../controller/PostController';

const route: IRouter = express.Router();

route.get('/posts', new PostController().GetAllPosts);
route.post('/posts', new PostController().CreatePost);
route.get('/posts/:id', new PostController().GetSinglePost);

// implementation of comments on single

route.get('/posts/:id/comments', new PostController().GetAllComments);
route.post('/posts/:id/comments', new PostController().CreateComment);

export default route;
