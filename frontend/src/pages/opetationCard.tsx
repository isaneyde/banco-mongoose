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
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListaAgencias } from "@/components/listaAgencia";
import { PiggyBank, HandCoins, Handshake, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";

type OperacaoCardProps = {
  titulo: string;
  descricao: string;
  tipoOperacao: string;
  icone: ReactNode;
};

export const OperacaoCard = ({
  titulo,
  descricao,
  tipoOperacao,
  icone,
}: OperacaoCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex items-center gap-2">
        <div className="w-6 h-6">{icone}</div>
        <CardTitle className="text-base">{titulo}</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 flex flex-col gap-3">
        <p>{descricao}</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-fit">
              {tipoOperacao}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Escolha o local de {tipoOperacao.toLowerCase()}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Agências mais próximas.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <ListaAgencias />

            <AlertDialogFooter>
              <Button>NUMERÁRIO</Button>
              <Button>CHEQUE</Button>
              <AlertDialogCancel>Fechar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

type AcaoSimplesCardProps = {
  titulo: string;
  descricao: string;
  mensagemDialogo: string;
  subtituloDialogo: string;
  textoBotao: string;
  icone: ReactNode;
  onConfirm?: () => void;
};

export const AcaoSimplesCard = ({
  titulo,
  descricao,
  mensagemDialogo,
  subtituloDialogo,
  textoBotao,
  icone,
  onConfirm,
}: AcaoSimplesCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex items-center gap-2">
        <div className="w-6 h-6">{icone}</div>
        <CardTitle className="text-base">{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600 flex flex-col gap-3">
        <p>{descricao}</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-fit">
              {textoBotao}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{mensagemDialogo}</AlertDialogTitle>
              <AlertDialogDescription>
                {subtituloDialogo}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export const DepositoCard = () => (
  <OperacaoCard
    titulo="Depósitos"
    descricao="Gerencie seus depósitos diários com facilidade. Transferências, extratos e mais."
    tipoOperacao="Depositar"
    icone={<PiggyBank className="text-blue-600 w-6 h-6" />}
  />
);

export const LevantamentoCard = () => (
  <OperacaoCard
    titulo="Levantamentos"
    descricao="Limites personalizados, controle pelo app e fatura digital."
    tipoOperacao="Levantar"
    icone={<HandCoins className="text-purple-600 w-6 h-6" />}
  />
);

export const AtendimentoCard = () => (
  <AcaoSimplesCard
    titulo="Atendimentos"
    descricao="Solicite atendimento flexível."
    mensagemDialogo="Chamar Atendimento?"
    subtituloDialogo="Um agente entrará em contato em breve."
    textoBotao="Solicitar Atendimento"
    icone={<Handshake className="text-green-600 w-6 h-6" />}
    onConfirm={() => console.log("Atendimento solicitado")}
  />
);

export const AtualizacaoCard = () => (
  <AcaoSimplesCard
    titulo="Atualizar Dados"
    descricao="Proteção de dados, autenticação 2FA e suporte 24h para sua conta."
    mensagemDialogo="Atualizar Informações?"
    subtituloDialogo="Deseja atualizar seus dados bancários agora?"
    textoBotao="Atualizar Agora"
    icone={<RefreshCcw className="text-gray-600 w-6 h-6" />}
    onConfirm={() => console.log("Atualização iniciada")}
  />
);
