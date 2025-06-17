import express from "express";
import {
  createAccount,
  updateAccount,
} from "../controllers/bankAccount.controller";

export const banckAccountRouter = express.Router();

banckAccountRouter .post("/", createAccount);
banckAccountRouter .put("/:id", updateAccount);
