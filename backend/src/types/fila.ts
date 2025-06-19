// import mongoose from "mongoose"
// import { Document } from "mongoose"
// export interface filaProps extends Document{
//     userId: String,
//      name:String
//     nrSenha:number
//     service:String
// }
export type FilaRequestParams = {
  agencia: string;
  data: string; 
  hora: string; 
};
 export type FilaResponse = {
  numeroFila: number;
};