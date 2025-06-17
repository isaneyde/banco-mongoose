import mongoose, { Schema } from "mongoose";
import { UserProps } from "../types/user.ts";

const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

export const User = mongoose.model<UserProps>("User", userSchema);
