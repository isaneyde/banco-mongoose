import mongoose, { Schema } from "mongoose";
import { filaProps } from "../types/fila";

const filaSchema=new Schema<filaProps>({
    nrSenha:{type: Number, required:true},
    name:{type:Schema.Types.ObjectId, ref:"users" ,required:true

    },
    service:{
        type:String, required:true,
    enum:["Deposito", "Atendimento", "Levantamento"]}
})
export const Fila= mongoose.model<filaProps>("fila",filaSchema );