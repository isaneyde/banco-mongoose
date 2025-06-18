import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Menu, Landmark } from "lucide-react";
import type { Filas } from "../types/fila";
import { useState, useEffect } from "react";
import { getAllFila } from "@/services/fila";
import { NavLink } from "react-router-dom";

export const Fila = () => {
  const [filas, setFilas] = useState<Filas[]>([]);

  useEffect(() => {
    async function fetchFilas() {
      try {
        const data = await getAllFila({
          data: {
            name: "",
            userId: "",
            senha: 0,
            service: "",
          },
        });
        if (Array.isArray(data)) {
          setFilas(data);
        } else if (data) {
          setFilas([data]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFilas();
  }, []);

  return (
    <div className="p-4">
      {/* Cabeçalho */}
      <div className="flex justify-center items-center gap-4 mt-2 text-blue-950">
        <ArrowLeft className="cursor-pointer" />
        <p className="text-xl font-bold">Tua Fila</p>
        <Menu />
      </div>

      {/* Localização */}
      <div className="flex items-center mt-4 ml-10">
        <div className="rounded-2xl flex justify-center items-center bg-blue-900 w-8 h-8 text-white font-extrabold">
          <Landmark />
        </div>
        <p className="ml-4 text-2xl text-blue-800">Mao Tse Tung</p>
      </div>
      <p className="ml-10 text-blue-800">Av. Mao Tse Tung - Kim Il Sung</p>

      {/* Lista de Filas */}
      {filas.map((fila, index) => (
        <Card
          key={index}
          className="shadow-lg h-auto w-80 mt-6 bg-white ml-4 rounded-xl border border-gray-200"
        >
          <CardHeader className="bg-blue-800 rounded-t-xl px-4 py-3">
            <CardTitle className="text-lg text-white">
              Fila de Atendimento
            </CardTitle>
            <CardDescription className="text-sm text-blue-100">
              Informações da senha
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 text-blue-900 space-y-1">
            <p>
              <span className="font-semibold">Senha:</span>{" "}
              {fila?.senha ? fila.senha : "11"}
            </p>
            <p>
              <span className="font-semibold">Nome:</span>{" "}
              {fila?.name ? fila.name : "Maria Génia"}
            </p>
            <p>
              <span className="font-semibold">Serviço:</span>{" "}
              {fila?.service ? fila.service : "Depósito"}
            </p>
          </CardContent>

          <CardFooter className="p-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Sair da fila
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg text-blue-900">
                    Tem certeza que deseja sair da fila?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                    Ao confirmar, será redirecionado(a) para a página inicial.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex justify-end gap-2">
                  <AlertDialogCancel className="bg-gray-300 text-blue-900 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                    Não
                  </AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <NavLink
                      to="/"
                      className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
                    >
                      Sim
                    </NavLink>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
