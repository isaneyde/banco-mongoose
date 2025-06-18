import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Response, Request, NextFunction } from "express";
dotenv.config();

export const authentionToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ mensagem: "User not authenticated" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  jwt.verify(token, jwtSecret as string, (err, user) => {
    if (err) res.status(403).json({ mensagem: "Invalid token" });

    (req as any).user = user;
    next();
  });
};
