import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Post } from "./post.model";
import { User } from "./user.model";

export const Like = sequelize.define("Like", {
  likeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Like.belongsTo(Post, {
  foreignKey: "postId",
});
Post.hasMany(Like, {
  foreignKey: "postId",
});

Like.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Like, {
  foreignKey: "userId",
});
