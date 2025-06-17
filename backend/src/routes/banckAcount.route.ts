import express from "express";
import { createAccount } from "../controllers/bankAccount.controller";

export const router = express.Router();

router.post("/abrir-conta", createAccount);
