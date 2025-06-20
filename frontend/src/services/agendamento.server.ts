import api from "./axios-instance";
import axios from "axios";

export type Agendamento = {
  id?: string;
  nomeCliente: string;
  agencia: string;
  data: string;
  hora: string;
};

export async function createAgendamento(data: Agendamento) {
  try {
    const response = await api.post("/agendamento/criar", data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar agendamento.");
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}

export async function getAgendamentos() {
  try {
    const response = await api.get("/agendamento/listar");
    return response.data as Agendamento[];
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar agendamentos.");
    }
    throw new Error("Erro de conexão com o servidor.");
  }
}
