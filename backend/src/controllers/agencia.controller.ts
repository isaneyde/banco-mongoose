import { Request, Response } from "express";
import * as AgenciaModel from "../models/agencia.model";

export const listarAgencias = (req: Request, res: Response) => {
  const lista = AgenciaModel.getAll();
  res.json(lista);
};

export const buscarAgencia = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const agencia = AgenciaModel.getById(id);
  if (!agencia) return res.status(404).json({ error: "Agência não encontrada" });

  res.json(agencia);
};

export const criarAgencia = (req: Request, res: Response) => {
  const { nome, endereco, telefone } = req.body;
  if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

  const novaAgencia = AgenciaModel.create({ nome, endereco, telefone });
  res.status(201).json(novaAgencia);
};

export const atualizarAgencia = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const { nome, endereco, telefone } = req.body;

  const agenciaAtualizada = AgenciaModel.update(id, { nome, endereco, telefone });
  if (!agenciaAtualizada) return res.status(404).json({ error: "Agência não encontrada" });

  res.json(agenciaAtualizada);
};

export const deletarAgencia = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const sucesso = AgenciaModel.remove(id);
  if (!sucesso) return res.status(404).json({ error: "Agência não encontrada" });

  res.status(204).send();
};
