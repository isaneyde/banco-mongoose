import mongoose from "mongoose";
import { model } from "mongoose";

const BankAccountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    identityNumber: { type: String, required: true, unique: true },
    accountType: {
      type: String,
      enum: ["poupança", "corrente", "salário"],
      required: true,
    },
    initialDeposit: { type: Number, required: true },

    password: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const BankAccount = model("BankAccount", BankAccountSchema);
export default BankAccount;
