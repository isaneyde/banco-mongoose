<<<<<<< HEAD
=======

>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
import { Document } from "mongoose";

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}
