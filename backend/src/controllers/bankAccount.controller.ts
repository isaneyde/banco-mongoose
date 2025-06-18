import { Request, Response } from "express";
import BankAccount from "../models/bankAccount.model";
import bcrypt from "bcrypt";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      identityNumber,
      accountType,
      initialDeposit,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !address ||
      !identityNumber ||
      !accountType ||
      initialDeposit === undefined ||
      !password
    ) {
      res.status(400).json({
        message: "Todos os campos são obrigatórios, incluindo a senha.",
      });
      return;
    }

    const existing = await BankAccount.findOne({ identityNumber });
    if (existing) {
      res.status(409).json({
        message: "Já existe uma conta com este número de identidade.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new BankAccount({
      fullName,
      email,
      phoneNumber,
      address,
      identityNumber,
      accountType,
      initialDeposit,
      password: hashedPassword,
    });

    await newAccount.save();

    const { password: _, ...accountData } = newAccount.toObject();

    res.status(201).json({
      message: "Conta bancária criada com sucesso!",
      account: accountData,
    });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const updateAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accountId = req.params.id;
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedAccount = await BankAccount.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true }
    );

    if (!updatedAccount) {
      res.status(404).json({ message: "Conta não encontrada." });
      return;
    }

    const { password: _, ...accountData } = updatedAccount.toObject();

    res.status(200).json({
      message: "Conta atualizada com sucesso!",
      data: accountData,
    });
  } catch (error) {
    console.error("Erro ao atualizar conta:", error);
    res.status(500).json({ message: "Erro ao atualizar conta.", error });
  }
};
