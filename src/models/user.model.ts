import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Post } from "./post.model";

interface userInterface {
  userId: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  userName: string;
  photo: string;
}

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

