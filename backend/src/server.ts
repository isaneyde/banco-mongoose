import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createAccount } from "./controllers/bankAccount.controller";

dotenv.config();

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());
app.use("/contas", createAccount);
mongoose.connect(process.env.BD_URI || "", {
  dbName: "banco-digital",
});
mongoose.connection.once("open", () =>
  console.log("BD conectado com sucesso!")
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
