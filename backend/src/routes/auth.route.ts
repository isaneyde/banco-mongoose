import express from "express";
import { Login } from "../controllers/auth.controller.ts";

export const authRouter = express.Router();

authRouter.post("/login", Login);
