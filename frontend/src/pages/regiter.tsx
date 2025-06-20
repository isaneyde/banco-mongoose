import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// 1. Schema de validação com Zod
const registerSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  tipo: z.enum(["cliente", "funcionario"]),
});

// 2. Inferir o tipo a partir do schema
type RegisterData = z.infer<typeof registerSchema>;

export const Register = () => {
  // 3. Setup do react-hook-form com zodResolver e valores padrão
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tipo: "cliente",
    },
  });

  // 4. Estado para mostrar mensagem após envio
  const [mensagem, setMensagem] = useState<
    { tipo: "sucesso" | "erro"; texto: string } | null
  >(null);

  // 5. Função chamada no submit do form
  const onSubmit = async (data: RegisterData) => {
    setMensagem(null);
    try {
      const response = await fetch("http://localhost:3004/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        setMensagem({ tipo: "erro", texto: error.message || "Erro ao registrar" });
        return;
      }

      const resData = await response.json();
      console.log("Registro bem-sucedido:", resData);

      setMensagem({ tipo: "sucesso", texto: "Conta criada com sucesso!" });
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setMensagem({ tipo: "erro", texto: "Erro ao registrar. Tente novamente." });
    }
  };

  // 6. JSX do formulário
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md bg-gradient-to-b from-sky-600 to-sky-300 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-100">
            Criar Conta Bancária
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="nome">Nome</Label>
              <Input
                className="bg-white text-gray-900"
                id="nome"
                {...register("nome")}
                aria-invalid={errors.nome ? "true" : "false"}
              />
              {errors.nome && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-white text-gray-900"
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="senha">Senha</Label>
              <Input
                className="bg-white text-gray-900"
                id="senha"
                type="password"
                {...register("senha")}
                aria-invalid={errors.senha ? "true" : "false"}
              />
              {errors.senha && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-white" htmlFor="tipo">
                Tipo de Usuário
              </Label>
              <select
                id="tipo"
                {...register("tipo")}
                className="w-full border rounded-md px-3 py-2 text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cliente">Cliente</option>
                <option value="funcionario">Funcionário</option>
              </select>
              {errors.tipo && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.tipo.message}
                </p>
              )}
            </div>

            {/* Mensagem sucesso ou erro */}
            {mensagem && (
              <p
                className={`text-center font-semibold ${
                  mensagem.tipo === "sucesso"
                    ? "text-green-500"
                    : "text-red-600"
                }`}
              >
                {mensagem.texto}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-7 mt-6">
            <Button
              type="submit"
              className="bg-white text-blue-600 hover:bg-gray-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
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
