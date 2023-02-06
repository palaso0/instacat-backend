import { Sequelize } from "sequelize";
const conString = "postgres://postgres:docker@localhost:5432/instacat";

export const sequelize = new Sequelize(conString)

