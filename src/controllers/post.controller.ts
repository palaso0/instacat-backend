import { Request, response, Response } from "express";
import { PostService } from "../services/post";
import { Post } from "../models";
export interface GetUserInfoRequest extends Request {
  user: {
    userId: number;
    email: string;
    name: string;
    lastName: string;
    userName: string;
    photo: string;
    iat: number;
  };
}

const postService = new PostService(Post);

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createPost = async (req: any, res: Response) => {
  const { photos, description } = req.body;
  try {
    const newPost = await postService.createPost(
      photos,
      description,
      req.user.userId
    );
    res.status(200).json(newPost);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await postService.findPostById(id);
    res.json(post);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await postService.removePost(id);
    res.json({
      message: `post ${id} deleted`,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const posts = await postService.getPostsByUserId(userId);
    res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

