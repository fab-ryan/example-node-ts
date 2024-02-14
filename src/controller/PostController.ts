import CustomResponse from '../utils/response';
import { Request, Response } from 'express';
import Post from '../modal/Post';
import { IPost } from '../types/postType';

interface IRequestPost extends Request {
  body: IPost;
}

class PostController {
  public async GetAllPosts(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const posts = await Post.find();

      response.send<typeof posts>(posts, 'Posts Fetched Successfully', 200);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  public async CreatePost(req: IRequestPost, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { title, content } = req.body;
      const post = new Post({
        title,
        content,
        date: new Date(),
      });
      const savedPost = await post.save();
      response.send<typeof savedPost>(
        savedPost,
        'Post Created Successfully',
        201,
      );
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
}

export { PostController };
