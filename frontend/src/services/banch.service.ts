
import type { Branch } from "../types/banch";

const API_URL = "http://localhost:3000/branches";

export const getAllBranches = async (): Promise<Branch[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar agências");
  return response.json();
};

export const createBranch = async (branch: Branch): Promise<Branch> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  if (!response.ok) throw new Error("Erro ao criar agência");
  return response.json();
};

export const updateBranch = async (id: string, branch: Branch): Promise<Branch> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  if (!response.ok) throw new Error("Erro ao atualizar agência");
  return response.json();
};

export const deleteBranch = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar agência");
};
