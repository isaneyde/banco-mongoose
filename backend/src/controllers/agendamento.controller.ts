import { Request, Response } from "express";
import { Agendamento } from "../models/agendamento.model";

// Criar
export const criarAgendamento = async (req: Request, res: Response) => {
  try {
    const novo = new Agendamento(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Listar
export const listarAgendamentos = async (_req: Request, res: Response) => {
  try {
    const agendamentos = await Agendamento.find();
    res.json(agendamentos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
