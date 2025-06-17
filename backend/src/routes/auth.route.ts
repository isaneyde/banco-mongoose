import Express from "express";
import { login } from "../controllers/auth.controller.ts";

export const authRouter = Express.Router();

authRouter.post("/", login);
