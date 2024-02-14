import express, { IRouter } from 'express';
import { PostController } from '../controller/PostController';

const route: IRouter = express.Router();

route.get('/', new PostController().GetAllPosts);
route.post('/', new PostController().CreatePost);


export default route;