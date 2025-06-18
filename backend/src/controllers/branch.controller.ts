import { Request, Response } from "express";
import { BankBranch } from "../models/bankBranch.model";

export const getBranchesWithQueue = async (req: Request, res: Response) => {
  try {
    const agencias = await BankBranch.aggregate([
      {
        $lookup: {
          from: "queues",
          localField: "_id",
          foreignField: "accountId",
          as: "fila"
        }
      },
      {
        $addFields: { filaTamanho: { $size: "$fila" } }
      },
      { $sort: { filaTamanho: 1 } } 
    ]);

    res.json(agencias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agências", error });
  }
};
