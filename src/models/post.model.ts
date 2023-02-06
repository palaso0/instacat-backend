import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Post = sequelize.define("Post", {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  description: {
    type: DataTypes.STRING
  },
});
