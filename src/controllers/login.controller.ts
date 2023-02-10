import { Request, Response } from "express";
import { User } from "../models/user.model";
import { sign, SignOptions } from "jsonwebtoken";
import { LoginService } from "../services/login";
import { UserService } from "../services/user";

import {
  loginValidator,
  signupValidator,
} from "../validations/login.validator";

const privateKey = process.env.SECRET || "instaCat";
const loginService = new LoginService();
const userService = new UserService();

export const login = async (req: Request, res: Response) => {
  const { error, value } = loginValidator.validate(req.body);
  if (error) {
    return res.send(error.details);
  }

  const { email, password } = req.body;
  const validPassword = await loginService.isLoginValid(email, password);
  if (!validPassword) {
    res.send("Invalid password");
  }
  const user = await loginService.getUserByEmail(email);
  const token = sign(user?.dataValues, privateKey);
  res.json({
    user,
    token,
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { error, value } = signupValidator.validate(req.body);
  if (error) {
    return res.send(error.details);
  }

  const { email, password, name, lastName, userName, photo } = req.body;
  try {
    const userExist = await userService.userExists(email, userName);
    if (userExist) {
      throw new Error("UserName or Email Already Exists");
    }

    const newUser = await userService.createUser(
      email,
      password,
      name,
      lastName,
      userName,
      photo
    );
    const token = sign(newUser?.dataValues, privateKey);
    res.json({
      newUser,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
