import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type LoginData = z.infer<typeof loginSchema>;

export const Login = () => {
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await fetch("http://localhost:3004/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Erro ao fazer login");
        return;
      }

      const result = await response.json();

      setUser({
        id: result.user._id,
        nome: result.user.nome,
        email: result.user.email,
        tipo: result.user.tipo,
        token: result.token,
      });

      localStorage.setItem("token", result.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      alert("Erro de rede. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login no Sistema Bancário</CardTitle>
        </CardHeader>
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
