
import mongoose from "mongoose";

const filaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount", required: true },
  status: { type: String, enum: ["pendente", "em_atendimento", "finalizado"], default: "pendente" },
  createdAt: { type: Date, default: Date.now },
});

export const Fila = mongoose.model("Filae", filaSchema);
