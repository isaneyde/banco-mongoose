import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const VerificarSistema = () => {
  const [estadoSistema, setEstadoSistema] = useState<"disponivel" | "fora" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de verificação
    setTimeout(() => {
      const status = Math.random() > 0.2 ? "disponivel" : "fora"; // 80% disponível
      setEstadoSistema(status);
    }, 1000);
  }, []);

  const verificarSenha = () => {
    // Simule ou peça uma senha real
    const senha = prompt("Digite sua senha para continuar:");
    if (senha === "1234") {
      navigate("/deposito");
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle> Verificação de Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {estadoSistema === null ? (
            <p>Verificando estado do sistema bancário...</p>
          ) : estadoSistema === "fora" ? (
            <p className="text-red-500 font-semibold">
              O sistema bancário está temporariamente fora de serviço.
            </p>
          ) : (
            <>
              <p className="text-green-600">Sistema disponível!</p>
              <Button onClick={verificarSenha}>Continuar para Depósitos</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
