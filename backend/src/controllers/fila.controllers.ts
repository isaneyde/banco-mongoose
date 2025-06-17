
import { Request, Response } from "express";
import { Fila} from "../models/fila.model";

export const addToFila = async (req: Request, res: Response) :Promise<any>=> {
  try {
    const { userId, accountId } = req.body;
    const existing = await Fila.findOne({ userId, status: "pendente" });
    if (existing) return res.status(400).json({ message: "Já está na fila." });

    const fila = await Fila.create({ userId, accountId });
    res.status(201).json({ message: "Registrado na fila com sucesso.", fila });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar na fila.", error });
  }
};

export const getFilaStatus  = async (req: Request, res: Response) :Promise<any>=> {
  try {
    const { userId } = req.params;
    const fila = await Fila.find({ status: "pendente" }).sort("createdAt");
    const posicao = fila.findIndex((f) => f.userId.toString() === userId);
    if (posicao === -1) return res.status(404).json({ message: "Usuário não está na fila." });

    res.status(200).json({ message: "Na fila.", posicao: posicao + 1 });
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar fila.", error });
  }
};
