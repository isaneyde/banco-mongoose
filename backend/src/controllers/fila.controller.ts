import { Fila } from "../models/fila";
import { filaProps } from "../types/fila";
import { Response, Request} from "express";
import { Users } from "../models/user";

export const createSenha = async (req: Request, res: Response) => {
  try {
    const body: filaProps = req.body;
    const {
    nrSenha,
    service,
    userId
    } = body;
      const existingUser = await Users.findById(userId);
    
    const newSenha= await Fila.create({
      nrSenha,
      name:existingUser,
      service,
      userId
    });
        
    res.status(200).json({ message: "Senha Criada com sucesso", newSenha}); 
  } catch (error) {

    res.status(500).json({ message: "Erro interno de servidor",error});
  }
};

export const getFilaId = async (req: Request, res: Response) => {
  try {
    const filaId = req.params.id;
    const existingfila= await Fila.findById(filaId).select({});
    if (!existingfila) {
      res.status(404).json({ message: "Passcode not found" });
    }
    res
      .status(200)
      .json({ message: "Passscode updated successfully", existingfila });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const deletedFila= (req: Request, res: Response) => {
    const { id } = req.params;
  Fila.findByIdAndDelete(id)
    .then((deletedFila) => {
      if (!deletedFila) {
        res.status(404).json({ message: "Passcode Not found" });
      }
      res.status(200).json({ message: "Passcode deleted successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "An internal server error occurred", error });
    });
};

export const updateFila = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body: filaProps= req.body;
    const {
 name,
 nrSenha,
 service,
     userId
    } = body;
    const existingSenha = await Users.findById(userId);
  
    const fila = await Fila.findByIdAndUpdate(id, {
name:existingSenha,
 nrSenha,
 service,
     userId
    });
    if (!fila) {
      res.status(404).json({ message: "passcode not found" });
    }

    res.status(200).json({ message: "passcode updated successfully", fila});
  } catch (error) {
    res.status(500).json({ message: "error when editing a passcode", error });
  }
}

  export const getAllFila = async (req: Request, res: Response) => {
   try {
      const filas = await Fila.find();

      res.status(200).json({
         message: "ok", 
         filas
      })
   } catch (error) {
      res.status(500).json({
         message: "Error fetching data"
      })
   }}


