import { useEffect, useState } from "react";
import { getAllBranches } from "../services/banch.service";
import type { Branch } from "../types/banch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { scheduleAppointment } from "../services/appointment.server";


interface ScheduleData {
  name: string;
  service: string;
  branchId: string;
}

export function BranchList() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState<ScheduleData>({
    name: "",
    service: "",
    branchId: "",
  });

  useEffect(() => {
    getAllBranches().then(setBranches).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: keyof ScheduleData) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await scheduleAppointment(formData);
    toast.success("Agendamento realizado com sucesso!");
    setFormData({
      name: "",
      service: "",
      branchId: "",
    });
  } catch (error) {
    console.error("Erro ao agendar:", error);
    toast.error("Erro ao agendar atendimento.");
  }
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Agências</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-5">
            {branches.map((branch) => (
              <li key={branch._id}>{branch.name} - {branch.location}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agendar Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <Label>Serviço</Label>
              <Select onValueChange={(value) => handleSelectChange(value, "service")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criar-conta">Criar Conta</SelectItem>
                  <SelectItem value="atualizar-dados">Atualizar Dados</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                  <SelectItem value="levantamento">Levantamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Agência</Label>
              <Select onValueChange={(value) => handleSelectChange(value, "branchId")}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha a agência" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch._id} value={branch._id!}>
                      {branch.name} - {branch.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">Agendar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
