import { Router } from "express";
import { login,signUp } from "../controllers/login.controller";
const router: Router = Router();

router.get("/");
router.post("/", login);
router.post("/register",signUp);

export default router;
