import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const registerSchema = z.object({
  fullName: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().min(7, "Número de telefone inválido"),
  address: z.string().min(5, "Endereço inválido"),
  identityNumber: z.string().min(5, "Número de identidade inválido"),
  accountType: z.enum(["poupança", "corrente", "salário"]),
  initialDeposit: z.coerce
    .number()
    .min(0, "Depósito inicial deve ser um número positivo"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type RegisterData = z.infer<typeof registerSchema>;

export const BankAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });
  const [message, setMensagem] = useState<{
    tipo: "sucesso" | "erro";
    texto: string;
  } | null>(null);

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await fetch("http://localhost:3004/conta", {
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
    <div className="min-h-screen flex items-center justify-center p-4 w-screen font-[Poppins]">
      <Card className="w-full max-w-md  px-6 shadow-md bg-gradient-to-b from-indigo-950 to-cyan-600 text-white">
        <CardHeader>
          <CardTitle className="mt-12 mb-8 text-2xl text-center text-gray-100">
            Criar Conta Bancária
          </CardTitle>
        </CardHeader>
        {message && (
          <div
            className={`text-center mb-2 ${
              message.tipo === "sucesso" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.texto}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 rounded-xl ">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input className="py-5 bg-white border-none  rounded-2xl text-gray-950" id="fullName" {...register("fullName")} />
              {errors.fullName && (
                <p className="text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input className="bg-white border-none  rounded-2xl text-gray-950 " id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input className="bg-white border-none  rounded-2xl text-gray-950" id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Telefone</Label>
              <Input className="bg-white border-none  rounded-2xl" id="phoneNumber text-gray-950" {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input className="bg-white border-none  rounded-2xl text-gray-950" id="address" {...register("address")} />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="identityNumber">Número de Identidade</Label>
              <Input className="bg-white border-none  rounded-2xl text-gray-950 focus:outline-none focus:border-none"
                id="identityNumber" {...register("identityNumber")} />
                {errors.identityNumber && (
                  <p className="text-sm text-red-600">
                    {errors.identityNumber.message}
                  </p>
              )}
            </div>

            <div className="space-y-2">
              <Label  htmlFor="accountType">Tipo de Conta</Label>
              <select
                id="accountType"
                {...register("accountType")}
                className="w-full border rounded-2xl border-none  px-3 py-2 bg-white text-gray-600"
              >
                <option value="poupança" className="bg-gray-300">Poupança</option>
                <option value="corrente" className="bg-gray-300">Corrente</option>
                <option value="salário" className="bg-gray-300">Salário</option>
              </select>
              {errors.accountType && (
                <p className="text-sm text-red-600">
                  {errors.accountType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialDeposit">Depósito Inicial</Label>
              <Input className="border-none bg-white rounded-2xl text-gray-950"
                id="initialDeposit"
                type="number"
                {...register("initialDeposit")}
              />
              {errors.initialDeposit && (
                <p className="text-sm text-red-600">
                  {errors.initialDeposit.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-7 mt-6 rounded-2xl">
            <Button type="submit"
            className="w-full py-6 mt-6 rounded-2xl font-semibold text-md bg-sky-900 hover:bg-sky-950 hover:text-xl cursor-pointer ">
              Registrar
            </Button>
            <a
              href="/login"
              className="text-sm text-center"
              
            >
              <p>Já tem conta? <span className="hover:underline">Faça Login</span> </p>
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
