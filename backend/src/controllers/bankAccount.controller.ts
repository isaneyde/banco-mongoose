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

export const updateAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const accountId = req.params.id;
    const updatedData = req.body;

    const updatedAccount = await BankAccount.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Conta não encontrada." });
    }

    res
      .status(200)
      .json({ message: "Conta atualizada com sucesso!", data: updatedAccount });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar conta.", error });
  }
};
