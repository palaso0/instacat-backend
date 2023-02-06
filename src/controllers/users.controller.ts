import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUser();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name, lastName, userName, photo } = req.body;
  try {
    const userExist = await userService.userExists(email, userName);
    if (userExist) {
      throw new Error("UserName or Email Already Exists");
    }
    const newUser = userService.createUser(
      email,
      password,
      name,
      lastName,
      userName,
      photo
    );
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.status(200).json("user created");
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.findUser(id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.removeUser(id);
    res.json({
      message: `user ${id} deleted`,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, name, lastName, userName, photo } = req.body;
  try {
    const user = userService.updateUser(
      id,
      email,
      password,
      name,
      lastName,
      userName,
      photo
    );
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
