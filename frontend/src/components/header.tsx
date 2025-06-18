import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

export  const Header=() =>{
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">💰 Sistema Bancário</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-gray-600 text-right">
              <p>Bem-vindo(a), <span className="font-medium">{user.nome}</span></p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-500">Não autenticado</p>
        )}
      </div>
    </header>
  );
}
