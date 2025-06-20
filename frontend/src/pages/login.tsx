import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/authContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type LoginData = z.infer<typeof loginSchema>;

export const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    const result = await login(data.email, data.senha);
    if (result.success) {
      const { user, token } = result.data;
      setUser({
        id: user._id,
        nome: user.fullName,
        email: user.email,
        tipo: user.accountType,
        token,
      });
      localStorage.setItem("token", token);
      navigate("/BankServices");
    } else {
      setMensagem(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-screen bg-gray-100 p-4 font-[Poppins]">
      <Card className="w-full max-w-md px-6 shadow-lg bg-gradient-to-b from-indigo-950 to-cyan-600 text-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl mt-12 mb-8 text-center">
            FAÇA LOGIN PARA CONTINUAR!
          </CardTitle>
        </CardHeader>
        {mensagem && (
          <div className="text-center mb-2 text-red-600">{mensagem}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xl">Email</Label>
              <Input
                className="py-6 bg-white text-gray-600 text-sm rounded-2xl border-none"
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-500 text-shadow-2xl">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha" className="text-xl">Senha</Label>
              <Input
                className=" py-6 bg-white text-gray-600 text-sm rounded-2xl border-none"
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                {...register("senha")}
              />
              {errors.senha && (
                <p className="text-sm text-red-400">{errors.senha.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-7 mt-6">
            <Button
              type="submit"
              className="w-full py-6 mt-6 rounded-2xl font-semibold text-md bg-sky-900 hover:bg-sky-950 hover:text-xl cursor-pointer"
            >
              Entrar
            </Button>
            <a
              href="/bankAccount"
              className="font-medium text-sm text-center text-gray-300 "
            >
              <p>Não tem conta? <span className="hover:underline">Clique aqui para criar</span> </p>
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
