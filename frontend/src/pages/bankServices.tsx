import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { Separator } from "@radix-ui/react-separator";
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
    <div>
      <section>
        {user ? (
          <>
            <div className="text-sm text-gray-600 text-right">
              <p>
                Bem-vindo(a), <span className="font-medium">{user.nome}</span>
              </p>
            </div>
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
          </>
        ) : (
          <p className="text-sm text-gray-500">Não autenticado</p>
        )}
      </section>
      <section>
        <div
          className="w-screen h-50 bg-cover "
          style={{
            backgroundImage: "url('/img/background.png')",
          }}
        ></div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DepositoCard />
        <LevantamentoCard />
        <AtendimentoCard />
        <AtualizacaoCard />
      </section>
    </div>
  );
};
