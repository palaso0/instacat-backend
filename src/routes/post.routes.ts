import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  removePost,
  getPostsByUserId,
} from "../controllers/post.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router: Router = Router();

router.get("/", verifyToken, getPosts);
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, removePost);
router.get("/findPost/:id", verifyToken, getPostById);
router.get("/:userId", verifyToken, getPostsByUserId);

export default router;
