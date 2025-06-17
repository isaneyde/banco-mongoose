
import express from "express";
import { createAppointment, getAllAppointments } from "../controllers/appointment.contoller";

export const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAllAppointments);
