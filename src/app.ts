import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import postRoutes from "./routes/post.routes";
import likeRoutes from "./routes/like.controller";
import commentaryRoutes from "./routes/commentary.controller";

import { User, Post, Like, Commentary, Follower } from "./models";
import { sequelize } from "./database/database";
const app: Express = express();

dotenv.config();

//jwt
const keys = {
  key: "SecretKey",
};
app.set("key", keys.key);

// Middlewares
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/commentaries", commentaryRoutes);

export default app;
