import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Post } from "./post.model";
import { User } from "./user.model";

export const Follower = sequelize.define("Follower", {
  followId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Follower.belongsTo(Post, {
  foreignKey: "postId",
});
User.hasMany(Follower, {
  foreignKey: "followedId",
});
User.hasMany(Follower, {
  foreignKey: "followerId",
});
