import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-2xl border-b border-gray-200">
      <h1
        className="text-2xl font-bold text-red
      -600 flex items-center gap-2"
      >
        <span className="text-white">Mongoose Bank</span>
      </h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-white text-right leading-tight">
              <p>
                Bem-vindo(a),{" "}
                <span className="font-semibold text-gray-900">{user.nome}</span>
              </p>
            </div>
            <Separator orientation="vertical" className="h-6 bg-gray-300" />
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-1 text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">Não autenticado</p>
        )}
      </div>
    </header>
  );
};
