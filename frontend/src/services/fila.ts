
import axios from "axios";

export const registerInQueue = async (userId: string, accountId: string) => {
  return axios.post("http://localhost:3000/fila", { userId, accountId });
};

export const getQueuePosition = async (userId: string) => {
  return axios.get(`http://localhost:3000/fila/${userId}`);
};
