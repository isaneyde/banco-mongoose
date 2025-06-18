import axios from "axios";

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
  }
}
