import api from "./axios-instance";

export async function getAgencias() {
  const response = await api.get("/branches");
  return response.data;
}
