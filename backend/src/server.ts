import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.route.ts";
import dotenv from "dotenv";
import {
  createAccount,
  updateAccount,
} from "./controllers/bankAccount.controller";

dotenv.config();

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());
app.use("/login", authRouter);
app.use("/post", createAccount);
app.use("/put/:id", updateAccount);
mongoose.connect(process.env.BD_URI || "", {});
mongoose.connection.once("open", () =>
  console.log("BD conectado com sucesso!")
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
