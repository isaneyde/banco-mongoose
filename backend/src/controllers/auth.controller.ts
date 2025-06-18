import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import BankAccount from "../models/bankAccount.model";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Tentando login com:", email, password);
    const user = await BankAccount.findOne({ email });
    console.log("Usuário encontrado:", user);

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else if (!password) {
      res.status(400).json({ message: "Senha não informada" });
    } else {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        res.status(401).json({ message: "Senha inválida" });
      } else {
        const jwtSecret: string = process.env.JWT_SECRET || "default_secret";
        const token = jwt.sign(
          {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            accountType: user.accountType,
          },
          jwtSecret,
          { expiresIn: "24h" }
        );
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
          message: "Login realizado com sucesso",
          user: userWithoutPassword,
          token,
        });
      }
    }
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
