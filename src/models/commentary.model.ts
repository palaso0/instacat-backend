import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Post } from "./post.model";
import { User } from "./user.model";

export const Commentary = sequelize.define("Commentaries", {
  CommentaryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

Commentary.belongsTo(Post, {
  foreignKey: "postId",
});
Post.hasMany(Commentary, {
  foreignKey: "postId",
});

Commentary.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Commentary, {
  foreignKey: "userId",
});
