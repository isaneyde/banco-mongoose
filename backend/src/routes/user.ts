import Express from "express";

import { register } from "../controllers/user.controller.ts";
import { getMe } from "../controllers/user.controller.ts";
import { authentionToken } from "../milddleware/auth.Middleware.ts";
export const userRouter = Express.Router();
userRouter.post("/", register);
userRouter.get("/", authentionToken, getMe);
