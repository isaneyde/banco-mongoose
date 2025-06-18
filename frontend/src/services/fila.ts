import axios from "axios";
import type { Filas } from "../types/fila";

<<<<<<< HEAD
const api = axios.create({
  baseURL: "http://localhost:3004/",
  //const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:3004/"
});

export async function getAllFila({
}): Promise<Filas [] | undefined> {
  try {
    const res = await api.get("/senhas");
    //console.log(res.data)
    return res.data;
   
  } catch (error) {
    console.error("Error fetching the passcode", error);
    return [];
=======
export const registerInQueue = async (userId: string, accountId: string) => {
  return axios.post("http://localhost:3004/fila", { userId, accountId });
};

export const getQueuePosition = async (userId: string) => {
  return axios.get(`http://localhost:3004/fila/${userId}`);
};
export async function getAllFila() {
  try {
    const response = await axios.get("http://localhost:3004/fila");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filas:", error);
    throw error;
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
  }
}
