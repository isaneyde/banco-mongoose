import mongoose from "mongoose";
import { UserProps } from "../types/user";

const userschema = new mongoose.Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

export const Users = mongoose.model("users", userschema);
