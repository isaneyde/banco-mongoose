import mongoose from "mongoose";
import { model } from "mongoose";
const branchSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  latitude: Number,
  longitude: Number,
});
export const BankBranch = mongoose.model("BankBranch", branchSchema);
