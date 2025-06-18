import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Schema de validação com Zod
const registerSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  tipo: z.enum(["cliente", "funcionario"]),
});

type RegisterData = z.infer<typeof registerSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tipo: "cliente",
    },
  });
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);


  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await fetch("http://localhost:3004/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Erro ao registrar");
        return;
      }

      const resData = await response.json();
      console.log("Registro bem-sucedido:", resData);
     
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao registrar:", error);
     
    }
    setMensagem({ tipo: "sucesso", texto: "Conta criada com sucesso!" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="w-full max-w-md shadow-md bg-gradient-to-b from-sky-600 to-sky-300 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-100">Criar Conta Bancária</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="nome">Nome</Label>
              <Input className="bg-white text-gray-900" id="nome" {...register("nome")} />
              {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input className="bg-white text-gray-900" id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha">Senha</Label>
              <Input className="bg-white text-gray-900" id="senha" type="password" {...register("senha")} />
              {errors.senha && <p className="text-sm text-red-600">{errors.senha.message}</p>}
            </div>
            <div className="space-y-1 mb-4 ">
              <Label className=" text-white" htmlFor="tipo">Tipo de Usuário</Label>
              <select
                id="tipo"
                {...register("tipo")}
                className="w-full border rounded-md px-3 py-2 text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                <option value="cliente">Cliente</option>
                <option value="funcionario">Funcionário</option>
              </select>
              {errors.tipo && <p className="text-sm text-red-600">{errors.tipo.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-7 mt-6">
            <Button type="submit" className="size- bg-white text-blue-600 hover:bg-gray-200">
              Registrar
            </Button>
            <a
              href="/login"
              className="text-sm text-center text-gray-100 hover:underline"
            >
              Já tem uma conta? Faça login
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
