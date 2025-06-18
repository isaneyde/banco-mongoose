import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth.route.ts";
import { banckAccountRouter } from "./routes/banckAcount.route.ts";
import {SenhaRoute} from "./routes/fila.route.ts";
import { branchRouter } from "./routes/branch.route.ts";
import { appointmentRouter } from "./routes/appointment.route";

dotenv.config();

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

app.use("/", authRouter);

app.use("/conta", banckAccountRouter);

app.use("/appointments", appointmentRouter);
app.use("/branches", branchRouter);

app.use("/fila", SenhaRoute);

mongoose.connect(process.env.BD_URI || "");
mongoose.connection.once("open", () =>
  console.log("BD conectado com sucesso!")
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
