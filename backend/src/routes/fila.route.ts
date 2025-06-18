import express from "express"
import { createSenha,updateFila, getFilaId, deletedFila, getAllFila} from "../controllers/fila.controller";
export const SenhaRoute= express.Router();


SenhaRoute.post("/", createSenha);
SenhaRoute.put("/:id", updateFila);
SenhaRoute.delete("/:id",deletedFila);
SenhaRoute.get("/:id", getFilaId);
SenhaRoute.get("/", getAllFila)