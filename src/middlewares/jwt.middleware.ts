import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    const user = verify(bearerToken, `${process.env.ACCESS_TOKEN_SECRET}`);
    req.user = user;
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};
