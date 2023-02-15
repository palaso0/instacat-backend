import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import postRoutes from "./routes/post.routes";
import likeRoutes from "./routes/like.routes";
import commentaryRoutes from "./routes/commentary.routes";

import cors from "cors";

const app: Express = express();

dotenv.config();

//jwt
const keys = {
  key: "SecretKey",
};
app.set("key", keys.key);

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/login", loginRoutes);
app.use("/v1/api/posts", postRoutes);
app.use("/v1/api/likes", likeRoutes);
app.use("/v1/api/commentaries", commentaryRoutes);
app.use("/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
