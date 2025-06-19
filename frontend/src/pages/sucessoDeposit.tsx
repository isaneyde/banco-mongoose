import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

type AgendamentoInfo = {
  agencia: string;
  data: string;
  hora: string;
  nomeCliente?: string;
};

export const Sucesso = () => {
  const [agendamento, setAgendamento] = useState<AgendamentoInfo | null>(null);
  const [numeroFila, setNumeroFila] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("agendamentoConfirmado");
    if (dados) {
      setAgendamento(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (agendamento) {
        const dataFormatada = new Date(agendamento.data).toISOString().slice(0, 10);
        axios
          .get("http://localhost:3004/fila", {
            params: {
              agencia: agendamento.agencia,
              data: dataFormatada,
              hora: agendamento.hora,
            },
          })
          .then((res) => setNumeroFila(res.data.numeroFila))
          .catch((err) => console.error("Erro ao buscar número na fila", err));
      }
    }, 5000); 

    return () => clearInterval(intervalo);
  }, [agendamento]);

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT");
  };

  return (
    <div className="p-6 max-w-xl mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-green-600 text-white rounded-t-md">
          <CardTitle className="text-center text-xl">✅ Agendamento Confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-6 text-center text-gray-700">
          {agendamento ? (
            <>
              <p><strong>Agência:</strong> {agendamento.agencia}</p>
              <p><strong>Data:</strong> {formatarData(agendamento.data)}</p>
              <p><strong>Hora:</strong> {agendamento.hora}</p>
              <p className="text-xl font-bold text-blue-600">
                {numeroFila !== null ? (
                  <>Você está na fila: <span className="text-black">{numeroFila}</span></>
                ) : (
                  <>Carregando número na fila...</>
                )}
              </p>
            </>
          ) : (
            <p>Carregando detalhes do agendamento...</p>
          )}
          <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/verificar-sistema")}
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
