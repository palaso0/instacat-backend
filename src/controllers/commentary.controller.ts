import { Request, Response } from "express";
import { CommentaryService } from "../services/commentary";

const commentaryService = new CommentaryService();

export const getCommentarysByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const commentarys = await commentaryService.getCommentarysByPostId(postId);
    res.status(200).json(commentarys);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCommentary = async (req: Request, res: Response) => {
  const { postId, userId, comment } = req.body;
  try {
    const commentaryExists = await commentaryService.commentaryExists(
      postId,
      userId
    );
    if (commentaryExists) {
      throw new Error("Commentary already exist");
    }
    await commentaryService.createCommentary(postId, userId, comment);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.status(200).json("commentary created");
};

export const removeCommentary = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    await commentaryService.removeCommentary(postId, userId);
    res.json({
      message: `commentary deleted`,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
