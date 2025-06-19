import { Schema, model, Document } from "mongoose";

export interface IAgendamento extends Document {
  nomeCliente: string;
  agencia: string;
  data: string;
  hora: string;
}

const AgendamentoSchema = new Schema<IAgendamento>({
  nomeCliente: { type: String, required: true },
  agencia: { type: String, required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
}, { timestamps: true });

export const Agendamento = model<IAgendamento>("Agendamento", AgendamentoSchema);
