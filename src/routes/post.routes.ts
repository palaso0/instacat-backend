import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  removePost,
  getPostsByUserId,
} from "../controllers/post.controller";

const router: Router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", removePost);
router.get("/findPost/:id", getPostById);
router.get("/:userId", getPostsByUserId);

export default router;
