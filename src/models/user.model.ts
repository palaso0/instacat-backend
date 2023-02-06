import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Post } from "./post.model";

export const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User, {
  foreignKey: "userId",
});

