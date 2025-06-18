import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ErrorPage=()=> {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">Página não encontrada</h2>
        <p className="mt-2 text-gray-600">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Button
          className="mt-6"
          onClick={() => navigate("/")}
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======

}


>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
