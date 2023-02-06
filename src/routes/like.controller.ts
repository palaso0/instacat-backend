import { Router } from "express";
import {
  createLike,
  removeLike,
  getLikesByPostId,
} from "../controllers/like.controller";

const router: Router = Router();

router.get("/:postId", getLikesByPostId);
router.post("/", createLike);
router.delete("/", removeLike);

export default router;
