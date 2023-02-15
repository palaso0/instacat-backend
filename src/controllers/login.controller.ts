import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { LoginService } from "../services/login";
import { UserService } from "../services/user";
import { User } from "../models";
import {
  loginValidator,
  signupValidator,
} from "../validations/login.validator";

const loginService = new LoginService(User);
const userService = new UserService(User);

export const login = async (req: Request, res: Response) => {
  const { error, value } = loginValidator.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  const user = await loginService.getUserByEmail(email);
  if (user == null) return res.status(400).json({ error: "User not found" });

  const validPassword = await loginService.isLoginValid(email, password);
  if (!validPassword) return res.json({ error: "Invalid password" });

  const token = sign(user?.dataValues, `${process.env.ACCESS_TOKEN_SECRET}`);
  res.json({
    error: null,
    user: user.dataValues,
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
    const token = sign(
      newUser?.dataValues,
      `${process.env.ACCESS_TOKEN_SECRET}`
    );
    res.json({
      error: null,
      newUser,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
