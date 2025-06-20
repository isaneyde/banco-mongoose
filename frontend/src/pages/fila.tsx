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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Filas } from "../types/fila";
import { useState, useEffect } from "react";
import { getAllFila } from "../services/fila.serve.";
import { NavLink } from "react-router-dom";

export const Fila = () => {
  const [filas, setFilas] = useState<Filas[]>([]);
  const [service, setService] = useState("Disponível");

  useEffect(() => {
    async function fetchFilas() {
      try {
        const data = await getAllFila({
        });
        if (Array.isArray(data)) {
          setFilas(data);
        } else if (data) {
          setFilas([data]);
        }
      } catch (error) {
        console.error("Erro ao buscar filas:", error);
      }
    }

    fetchFilas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setService("Fora de Serviço");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="p-4 space-y-4 bg-white w-screen h-screen">
      <div className="flex items-center gap-2 text-blue-950">
        <NavLink to="/BankServices">
          <ArrowLeft className="w-5 h-5" />
        </NavLink>
        <p className="text-xl font-semibold text-blue-800">Mao Tse Tung</p>
      </div>
      <p className="text-sm text-blue-800 ml-7">
        Av. Mao Tse Tung - Kim Il Sung
      </p>


      <div className="flex flex-wrap gap-4 mt-4">
        {filas.map((fila, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg w-80 rounded-2xl border shadow-black ml-4"
          >
            <CardHeader className="bg-blue-800 text-white rounded-t-2xl px-4 py-3 -mt-6">
              <CardTitle className="text-lg">Fila de Atendimento</CardTitle>
              <CardDescription className="text-2xl text-blue-100">
                {service}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 text-blue-900 space-y-2">
              <p>
                <span className="font-semibold">Senha:</span>
                {fila?.senha || "11"}
              </p>
              <p>
                <span className="font-semibold">Nome:</span>
                {fila?.name || "Maria Génia"}
              </p>
              <p>
                <span className="font-semibold">Serviço:</span>
                {fila?.service || "Atendimento"}
              </p>
            </CardContent>

            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="bg-red-700 rounded-2xl text-white">
                    Sair da fila
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja sair da fila?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="w-5">Não</AlertDialogCancel>
                    <AlertDialogAction className="w-5">
                      <NavLink
                        to="/"
                        className="inline-flex items-center justify-center rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 transition-colors"
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
    </div>
    </>
  );
};
