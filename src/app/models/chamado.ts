export interface Chamado {
  id?: number;
  titulo: string;
  status: number;
  prioridade: number;
  tecnico: number;
  cliente: number;
  observacoes: string;
  nomeCliente?: string;
  nomeTecnico?: string;
  dataAbertura?: string;
  dataFechamento?: string;
}

export enum Status {
  ABERTO,
  ANDAMENTO,
  ENCERRADO,
}

export enum Prioridade {
  BAIXA,
  MEDIA,
  ALTA,
}
