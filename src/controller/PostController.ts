import CustomResponse from '../utils/response';
import { Request, Response } from 'express';
import Post from '../modal/Post';
import { IPost } from '../types/postType';
import Comments from '../modal/Comment';

interface IRequestPost extends Request {
  body: IPost;
}
interface IReqComment extends Request {
  params: {
    id: string;
  };
}

interface IReqBodyComment extends Request {
  body: {
    name: string;
    email: string;
    comment: string;
  };
  params: {
    id: string;
  };
}

class PostController {
  public async GetAllPosts(req: Request, res: Response) {
    // validation
    
    const response = new CustomResponse(req, res);
    try {
      const posts = await Post.find();

      response.send<typeof posts>(posts, 'Posts Fetched Successfully', 200);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  public async GetSinglePost(req: IReqComment, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      const comments = await Comments.find({ blogId: id });
      const payload = {
        post,
        comments,
      };
      response.send<typeof payload>(payload, 'Post Fetched Successfully', 200);
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

  public async GetAllComments(req: IReqComment, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { id: blogId } = req.params;

      const comments = await Comments.find({ blogId: blogId })
        .populate({
          path: 'blogId',
        })
        .exec();
      response.send<typeof comments>(
        comments,
        'Comments Fetched Successfully',
        200,
      );
    } catch (error) {
      console.log(error);
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async CreateComment(req: IReqBodyComment, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { name, email, comment } = req.body;
      const { id: blogId } = req.params;
      const newComment = new Comments({
        name,
        email,
        comment,
        blogId,
        date: new Date(),
      });
      const savedComment = await newComment.save();
      response.send<typeof savedComment>(
        savedComment,
        'Comment Created Successfully',
        201,
      );
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
}

export { PostController };
