import { Request, Response } from "express";
import { LikeService } from "../services/like";

const likeService = new LikeService();

export const getLikesByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const likes = await likeService.getLikesByPostId(postId);
    res.status(200).json(likes);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createLike = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    const likeExists = await likeService.likeExists(postId, userId);
    if (likeExists) {
      throw new Error("Like already exist");
    }
    await likeService.createLike(postId, userId);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.status(200).json("like created");
};

export const removeLike = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    const like: any = await likeService.removeLike(postId, userId);
    res.json({
      message: `like deleted`,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
