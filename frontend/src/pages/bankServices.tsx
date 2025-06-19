import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import {
  DepositoCard,
  LevantamentoCard,
  AtendimentoCard,
  AtualizacaoCard,
} from "./opetationCard";

export const BankServices = () => {
  const { user, logout } = useAuth();

  return (
    <div className="font-[Poppins] p-4 space-y-6 bg-gradient-to-b from-indigo-950 to-cyan-600"> 
      <section className="flex justify-between items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Bem-vindo(a),{" "}
              <span className="font-semibold text-foreground">{user.nome}</span>
            </p>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-1"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Não autenticado</p>
        )}
      </section>

      <section className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{
            backgroundImage: "url('/img/background.png')",
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h2 className="text-white text-2xl font-semibold uppercase">
            Serviços Bancários
          </h2>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-white">
        <DepositoCard />
        <LevantamentoCard />
        <AtendimentoCard />
        <AtualizacaoCard />
      </section>
    </div>
  );
};
