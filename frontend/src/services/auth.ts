import axios from "axios";

const API_URL = "http://localhost:3004";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("session", JSON.stringify(response.data.user));
      return { success: true, data: response.data };
    } else if (response.status === 401) {
      return { success: false, message: "Senha inválida" };
    } else if (response.status === 404) {
      return { success: false, message: "Usuário não encontrado" };
    } else if (response.status === 400) {
      return { success: false, message: "Senha não informada" };
    } else {
      return { success: false, message: "Erro desconhecido" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return { success: false, message: "Senha inválida" };
      } else if (error.response.status === 404) {
        return { success: false, message: "Usuário não encontrado" };
      } else if (error.response.status === 400) {
        return { success: false, message: "Senha não informada" };
      } else {
        return {
          success: false,
          message:
            error.response.data?.message ||
            "Erro ao fazer login. Tente novamente.",
        };
      }
    }
    return {
      success: false,
      message: "Erro ao fazer login. Tente novamente.",
    };
  }
}
