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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login no Sistema Bancário
          </CardTitle>
        </CardHeader>
        {mensagem && (
          <div className="text-center mb-2 text-red-600">{mensagem}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                {...register("senha")}
              />
              {errors.senha && (
                <p className="text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <a
              href="#"
              className="text-sm text-center text-blue-600 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
