import { Router } from "express";
import { login } from "../controllers/login.controller";
const router: Router = Router();

router.get("/");
router.post("/", login);
router.put("/:id");
router.delete("/:id");
router.get("/:id");

export default router;
