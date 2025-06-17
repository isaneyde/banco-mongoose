import { Request, Response } from "express";
import BankAccount from "../models/bankAccountProps";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      identityNumber,
      accountType,
      initialDeposit,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !address ||
      !identityNumber ||
      !accountType ||
      initialDeposit === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const existing = await BankAccount.findOne({ identityNumber });
    if (existing) {
      return res.status(409).json({
        message: "Já existe uma conta com este número de identidade.",
      });
    }

    const newAccount = new BankAccount({
      fullName,
      email,
      phoneNumber,
      address,
      identityNumber,
      accountType,
      initialDeposit,
    });

    await newAccount.save();

    res.status(201).json({
      message: "Conta bancária criada com sucesso!",
      account: newAccount,
    });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
