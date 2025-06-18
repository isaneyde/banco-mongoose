import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { SenhaRoute } from "./routes/fila.route";
import { authRouter } from "./routes/auth.route";
import { banckAccountRouter } from "./routes/banckAcount.route";
import { branchRouter } from "./routes/branch.route";
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
});
