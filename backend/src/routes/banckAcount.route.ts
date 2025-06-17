import express from "express";
import {
  createAccount,
  updateAccount,
} from "../controllers/bankAccount.controller";

export const router = express.Router();

router.post("/", createAccount);
router.put("/:id", updateAccount);
