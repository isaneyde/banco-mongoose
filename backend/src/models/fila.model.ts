
// import mongoose from "mongoose";

// const filaSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   accountId: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount", required: true },
//   status: { type: String, enum: ["pendente", "em_atendimento", "finalizado"], default: "pendente" },
//   createdAt: { type: Date, default: Date.now },
// });

// export const Fila = mongoose.model("Filae", filaSchema);
// import mongoose, { Schema } from "mongoose";
// import { filaProps } from "../types/fila";

// const filaSchema=new Schema<filaProps>({
//     nrSenha:{type: Number, required:true},
//     name:{type:Schema.Types.ObjectId, ref:"users" ,required:true

//     },
//     service:{
//         type:String, required:true,
//     enum:["Deposito", "Atendimento", "Levantamento"]}
// })
// export const Fila= mongoose.model<filaProps>("fila",filaSchema );
 import mongoose, { Schema, Document } from "mongoose";

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
});

export const Agendamento = mongoose.model<IAgendamento>("Agendamento", AgendamentoSchema);
