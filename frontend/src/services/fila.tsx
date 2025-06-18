import axios from "axios";
import type { Filas } from "../types/fila";

const api = axios.create({
  baseURL: "http://localhost:3004/",
  //const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:3004/"
});

export async function getAllFila({}): Promise<Filas[] | undefined> {
  try {
    const res = await api.get("/senhas");
    //console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("Error fetching the passcode", error);
    return [];
  }
}
