import { Request, response, Response } from "express";
import { PostService } from "../services/post";
import jwt from "jsonwebtoken";
const postService = new PostService();

export const getPosts = async (req: Request, res: Response) => {
  console.log("Mostrando posts");
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  //TODO, add token for create Posts
  const { photos, description, userId } = req.body;
  try {
    const newPost = await postService.createPost(photos, description, userId);
    res.status(200).json(newPost);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.status(200).json("user created");
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
  console.log("Mostrando posts");
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
