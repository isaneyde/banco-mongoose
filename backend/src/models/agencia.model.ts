import { Agencia } from "../types/agencia.types";

let agencias: Agencia[] = [];
let nextId = 1;


export function getAll(): Agencia[] {
  return agencias;
}

export function getById(id: number): Agencia | undefined {
  return agencias.find(a => a.id === id);
}

export function create(data: Omit<Agencia, "id" | "criadoEm" | "atualizadoEm">): Agencia {
  const newAgencia: Agencia = {
    id: nextId++,
    nome: data.nome,
    endereco: data.endereco,
    telefone: data.telefone,
    criadoEm: new Date().toISOString(),
  };
  agencias.push(newAgencia);
  return newAgencia;
}

export function update(id: number, data: Partial<Omit<Agencia, "id" | "criadoEm" | "atualizadoEm">>): Agencia | undefined {
  const agencia = getById(id);
  if (!agencia) return undefined;

  if (data.nome !== undefined) agencia.nome = data.nome;
  if (data.endereco !== undefined) agencia.endereco = data.endereco;
  if (data.telefone !== undefined) agencia.telefone = data.telefone;
  agencia.atualizadoEm = new Date().toISOString();

  return agencia;
}

export function remove(id: number): boolean {
  const index = agencias.findIndex(a => a.id === id);
  if (index === -1) return false;
  agencias.splice(index, 1);
  return true;
}
