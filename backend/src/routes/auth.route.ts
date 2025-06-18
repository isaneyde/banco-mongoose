import Express from "express";
import { Login } from "../controllers/auth.controller.ts";

export const authRouter = Express.Router();

authRouter.post("/login", Login);
