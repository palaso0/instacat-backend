import { Router } from "express";
import {
  createCommentary,
  removeCommentary,
  getCommentarysByPostId,
} from "../controllers/commentary.controller";

const router: Router = Router();

router.get("/:postId", getCommentarysByPostId);
router.post("/", createCommentary);
router.delete("/", removeCommentary);

export default router;
