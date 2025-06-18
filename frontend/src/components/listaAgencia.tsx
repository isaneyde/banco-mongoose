import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { haversineDistance } from "../lib/haversine";

type Agencia = {
  id: number;
  nome: string;
  lat: number;
  lon: number;
};

const agencias: Agencia[] = [
  { id: 1, nome: "Agência Central", lat: -25.965, lon: 32.583 },
  { id: 2, nome: "Agência Costa do Sol", lat: -25.939, lon: 32.567 },
  { id: 3, nome: "Agência Matola", lat: -25.963, lon: 32.463 },
];

export const ListaAgencias = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [agenciaSelecionada, setAgenciaSelecionada] = useState<Agencia | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      }
    );
  }, []);

  const agenciasComDistancia = agencias.map((agencia) => ({
    ...agencia,
    distancia: userLocation
      ? haversineDistance(
          userLocation.lat,
          userLocation.lon,
          agencia.lat,
          agencia.lon
        )
      : null,
  }));

  const handleSelecionar = (agencia: Agencia) => {
    setAgenciaSelecionada(agencia);
    alert(`Você selecionou ${agencia.nome} para o depósito.`);
    // Aqui pode chamar outro modal ou salvar no contexto
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium">Escolha a agência mais próxima:</h3>

      {!userLocation && (
        <p className="text-sm text-gray-500">Obtendo sua localização...</p>
      )}

      {userLocation &&
        agenciasComDistancia
          .sort((a, b) => (a.distancia ?? Infinity) - (b.distancia ?? Infinity))
          .map((agencia) => (
            <div
              key={agencia.id}
              className="border rounded p-3 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{agencia.nome}</p>
                <p className="text-sm text-gray-500">
                  {agencia.distancia?.toFixed(2)} km de distância
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleSelecionar(agencia)}
              >
                Selecionar
              </Button>
            </div>
          ))}

      {agenciaSelecionada && (
        <p className="text-green-600 text-sm">
          Agência selecionada: <strong>{agenciaSelecionada.nome}</strong>
        </p>
      )}
    </div>
  );
};
