import express from "express";
import { getBranchesWithQueue } from "../controllers/branch.controller";

export const branchRouter = express.Router();

branchRouter.get("/agencias", getBranchesWithQueue);


