import api from "./axios-instance";

type createAccountData = {
  name: string;
  email: string;
  password: string;
  tipo?: string; 
};

export async function createAccountr(data: createAccountData) {
  try {
    const response = await api.post("/post", data);
    return response.data; 
  } catch (error: any) {
    if (error.response) {
     
      throw new Error(error.response.data.message || "Erro ao registrar usuário.");
    } else {
      
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

//actualizar conta
type UpdateAccountData = {
  id: string;
  data: {
    nome?: string;
    email?: string;
    tipo?: string;
    saldo?: number;
    estado?: string;
  };
};




export async function updateAccount({ id, data }: UpdateAccountData) {
  try {
    const response = await api.put(`/put/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar conta.");
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

