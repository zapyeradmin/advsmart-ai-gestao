
import { z } from "zod";

export const processSchema = z.object({
  numero: z.string().min(1, "Número do processo é obrigatório"),
  clienteId: z.string().min(1, "Cliente é obrigatório"),
  area: z.string().min(1, "Área jurídica é obrigatória"),
  instancia: z.string().min(1, "Instância é obrigatória"),
  comarca: z.string().min(1, "Comarca é obrigatória"),
  vara: z.string().optional(),
  assunto: z.string().min(1, "Assunto é obrigatório"),
  valorCausa: z.string().optional(),
  dataDistribuicao: z.string().min(1, "Data de distribuição é obrigatória"),
  dataAudiencia: z.string().optional(),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  urgencia: z.string().min(1, "Urgência é obrigatória"),
  observacoes: z.string().optional(),
  formaCobranca: z.string().min(1, "Forma de cobrança é obrigatória"),
  valorFixo: z.string().optional(),
  percentualExito: z.string().optional(),
  valorEntrada: z.string().optional(),
  valorAtosProcessuais: z.string().optional(),
  modoPagamento: z.string().optional(),
  numParcelas: z.string().optional(),
});

export type ProcessForm = z.infer<typeof processSchema>;

export const clientes = [
  { id: "1", nome: "Maria Silva Santos" },
  { id: "2", nome: "Empresa ABC Ltda." },
  { id: "3", nome: "João Carlos Mendes" },
];

export const responsaveis = [
  "Dr. Ricardo Oliveira",
  "Dra. Camila Santos", 
  "Dra. Ana Paula Lima"
];
