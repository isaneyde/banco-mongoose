import mongoose from "mongoose"
import { Document } from "mongoose"
export interface filaProps extends Document{
    userId: String,
     name:String
    nrSenha:number
    service:String
}