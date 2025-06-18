import api from "./axios-instance";
import axios from "axios";

type CreateAccountData = {
  fullName: string;
  email: string;
  password: string;
  accountType?: string;
};

export async function createAccount(data: CreateAccountData) {
  try {
    const response = await api.post("/conta", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao registrar usuário."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}
type UpdateAccountData = {
  id: string;
  data: {
    fullName?: string;
    email?: string;
    accountType?: string;
    saldo?: number;
    estado?: string;
  };
};

export async function updateAccount({ id, data }: UpdateAccountData) {
  try {
    const response = await api.put(`/conta/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar conta."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}
