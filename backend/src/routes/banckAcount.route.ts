import express from "express";
import { authentionToken } from "../milddleware/auth.Middleware.ts";
import {
  createAccount,
  updateAccount,
} from "../controllers/bankAccount.controller";
import { Login } from "../controllers/auth.controller.ts";

export const banckAccountRouter = express.Router();

banckAccountRouter.post("/", createAccount);
banckAccountRouter.post("/login", Login);
banckAccountRouter.put("/:id", authentionToken, updateAccount);
