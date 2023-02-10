import app from "./app";
import { sequelize } from "./database/database";
const port = process.env.PORT || 4000;
import { User, Post, Like, Commentary, Follower } from "./models";

const main = async () => {
  await sequelize.sync({ force: true });
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

main();
