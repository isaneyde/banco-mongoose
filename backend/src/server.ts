import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth.route";
import { banckAccountRouter} from "./routes/banckAcount.route";
import { branchRouter } from "./routes/branch.route";
import { agendamentoRouter } from "./routes/agendamento.route";
import { filaRouter } from "./routes/fila.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "localhost";

app.use(cors({ origin: "http://localhost:5004" }));
app.use(express.json());

// Rotas
app.use("/auth", authRouter);
app.use("/conta", banckAccountRouter);
app.use("/branches", branchRouter);
app.use("/agendamento", agendamentoRouter);
app.use("/fila", filaRouter);

// Conexão com MongoDB
mongoose
  .connect(process.env.BD_URI || "")
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) => console.log("Erro ao conectar com a BD:", error));

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
