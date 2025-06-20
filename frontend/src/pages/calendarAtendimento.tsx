import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { createAgendamento, getAgendamentos } from "../services/agendamento.server";
import type { Agendamento } from "../services/agendamento.server";

export const CalendarioAtendimento = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date());
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [agenciaSelecionada, setAgenciaSelecionada] = useState<any>(null); // Atualize para um tipo mais seguro se possível
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  const horariosDisponiveis = ["09:00", "10:30", "14:00", "16:00"];

  const isSunday = (date: Date) => date.getDay() === 0;

  useEffect(() => {
    getAgendamentos()
      .then(setAgendamentos)
      .catch((e: any) => setErro(e.message));
  }, []);

  const isHoraDisponivel = (hora: string) => {
    if (!dataSelecionada) return false;
    const dataISO = dataSelecionada.toISOString().slice(0, 10);
    return !agendamentos.some(
      (a) => a.data.slice(0, 10) === dataISO && a.hora === hora
    );
  };

  const confirmarAgendamento = async () => {
    if (dataSelecionada && horaSelecionada && agenciaSelecionada) {
      const agendamento: Agendamento = {
        nomeCliente: "Maria Genia",
        agencia: agenciaSelecionada.nome,
        data: dataSelecionada.toISOString(),
        hora: horaSelecionada,
      };

      try {
        await createAgendamento(agendamento);
        localStorage.setItem("agendamentoConfirmado", JSON.stringify(agendamento));
        navigate("/sucesso");
      } catch (error: any) {
        setErro(error.message || "Erro ao agendar atendimento.");
      }
    } else {
      setErro("Selecione a agência, data e hora antes de confirmar.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4 overflow-y-auto">
      <div className="w-full max-w-2xl">
        <Card className="bg-blue-600 text-white shadow-xl rounded-lg">
          <CardHeader className="bg-blue-700 text-white rounded-t-lg p-5">
            <CardTitle className="text-2xl font-semibold text-white text-center">
              Agendar Atendimento
            </CardTitle>
          </CardHeader>

          <CardContent className="bg-white text-black space-y-6 p-4 sm:p-6 rounded-b-lg">
            {erro && <p className="text-red-600 text-center">{erro}</p>}

            {!agenciaSelecionada ? (
              <div>
                <p className="font-semibold text-center mb-4">
                  Escolha a agência mais próxima:
                </p>

                {/* Aqui você pode exibir as opções de agências */}
                {/* Exemplo de botão fictício para selecionar uma agência */}
                <div className="flex justify-center gap-3">
                  <Button onClick={() => setAgenciaSelecionada({ nome: "Agência Central" })}>
                    Agência Central
                  </Button>
                  <Button onClick={() => setAgenciaSelecionada({ nome: "Agência Bairro A" })}>
                    Agência Bairro A
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm text-center text-gray-600 mb-4">
                  Agência selecionada: <strong>{agenciaSelecionada.nome}</strong>
                </div>

                <p className="font-medium text-center sm:text-left">
                  Escolha uma data disponível:
                </p>

                <Calendar
                  mode="single"
                  selected={dataSelecionada}
                  onSelect={(date) => {
                    if (!date || isSunday(date)) return;
                    setDataSelecionada(date);
                    setHoraSelecionada(null);
                    setErro(null);
                  }}
                  disabled={isSunday}
                  className="rounded-md border mt-2 border-blue-300 w-full compact-calendar"
                />

                {dataSelecionada && (
                  <div>
                    <p className="font-medium mb-2 text-center sm:text-left">
                      Horários disponíveis:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {horariosDisponiveis.map((hora) => (
                        <Button
                          key={hora}
                          variant="outline"
                          className={`text-white text-sm ${
                            horaSelecionada === hora
                              ? "bg-blue-700 hover:bg-blue-800"
                              : "bg-blue-500 hover:bg-blue-600"
                          } ${
                            !isHoraDisponivel(hora)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={!isHoraDisponivel(hora)}
                          onClick={() => {
                            if (isHoraDisponivel(hora)) setHoraSelecionada(hora);
                          }}
                        >
                          {hora}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {dataSelecionada && horaSelecionada && (
                  <div className="pt-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-base">
                          Confirmar Agendamento
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Deseja confirmar o agendamento?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não poderá ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmarAgendamento}>
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
