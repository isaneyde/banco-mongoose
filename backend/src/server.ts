import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
<<<<<<< HEAD

import { authRouter } from "./routes/auth.route.ts";
import { banckAccountRouter } from "./routes/banckAcount.route.ts";
import {SenhaRoute} from "./routes/fila.route.ts";
import { branchRouter } from "./routes/branch.route.ts";
=======
import { SenhaRoute } from "./routes/fila.route";
import { authRouter } from "./routes/auth.route";
import { banckAccountRouter } from "./routes/banckAcount.route";
import { branchRouter } from "./routes/branch.route";
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
import { appointmentRouter } from "./routes/appointment.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "http://localhost";

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5004",
  })
);
app.use(express.json());

// Rotas
app.use("/", authRouter);
app.use("/conta", banckAccountRouter);
app.use("/appointments", appointmentRouter);
app.use("/branches", branchRouter);

<<<<<<< HEAD
app.use("/fila", SenhaRoute);

mongoose.connect(process.env.BD_URI || "");
mongoose.connection.once("open", () =>
  console.log("BD conectado com sucesso!")
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
=======
app.use("/senhas", SenhaRoute);

// Conexão com o banco
mongoose
  .connect(process.env.BD_URI || "")
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao conectar com a BD:", error)
  );

// Start do servidor
app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
});
