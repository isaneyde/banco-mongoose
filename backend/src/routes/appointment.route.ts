import express from "express";
import {
  createAppointment,
  getAllAppointments,
} from "../controllers/appointment.contoller";

export const appointmentRouter = express.Router();

appointmentRouter.post("/creat", createAppointment);
appointmentRouter.get("/gt", getAllAppointments);
