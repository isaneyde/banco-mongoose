import cors from "cors";
import { SenhaRoute } from "./routes/fila.route";
import mongoose from "mongoose";
import dotenv from "dotenv"
import express from "express"

const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5004'
}));

dotenv.config();

const host =process.env.HOST || "http://localhost";
const port = process.env.PORT || 3004

app.use("/senhas",SenhaRoute );

mongoose
.connect(process.env.BD_URI as string)
.then(()=>console.log("BD conectado com sucesso!"))
.catch((error)=>console.log("OCorreu um erro ao conectar com a BD:",error));

app.listen(port,()=>console.log(`Server running on ${host}:${port}`));
