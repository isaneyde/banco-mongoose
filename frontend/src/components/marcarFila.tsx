import { useState } from "react";
import { registerInQueue, getQueuePosition } from "../services/queue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";

export const QueueRegister = () => {
  const [userId, setUserId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleQueue = async () => {
    try {
      await registerInQueue(userId, accountId);
      setSuccess(true);
      setMessage("Você entrou na fila com sucesso!");
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Erro ao registrar.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Input placeholder="ID do Usuário" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <Input placeholder="ID da Conta" value={accountId} onChange={(e) => setAccountId(e.target.value)} className="mt-2" />
      <Button onClick={handleQueue} className="mt-4">Entrar na Fila</Button>

      {message && (
        <div className={`mt-4 flex items-center gap-2 ${success ? "text-green-600" : "text-red-600"}`}>
          {success ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};
