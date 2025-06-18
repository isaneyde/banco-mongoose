// src/controllers/appointment.controller.ts
import { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, service, branchId } = req.body;

    const newAppointment = await Appointment.create({ name, service, branchId });

    res.status(201).json({
      message: "Agendamento criado com sucesso",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro ao agendar atendimento." });
  }
};

export const getAllAppointments = async (_req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().populate("branchId");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos." });
  }
};
