import express from "express";
import {
  criarAgendamento,
  listarAgendamentos,
} from "../controllers/agendamento.controller";

export const agendamentoRouter = express.Router();

agendamentoRouter.post("/criar", criarAgendamento);
agendamentoRouter.get("/listar", listarAgendamentos);
