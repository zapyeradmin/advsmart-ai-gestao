
import { z } from "zod";

export const transacaoSchema = z.object({
  id: z.string().optional(),
  tipo: z.enum(["Receita", "Despesa"]),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().min(0, "Valor deve ser positivo"),
  data: z.string().min(1, "Data é obrigatória"),
  dataVencimento: z.string().optional(),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  subcategoria: z.string().optional(),
  status: z.enum(["Pago", "Pendente", "Vencido"]),
  cliente: z.string().optional(),
  processo: z.string().optional(),
  parceiro: z.string().optional(),
  observacoes: z.string().optional(),
});

export type Transacao = z.infer<typeof transacaoSchema>;

export const parceiroSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.enum(["Advogado", "Captador", "Rede Social", "Anúncios", "Outros"]),
  contato: z.string().optional(),
  percentual: z.number().optional(),
  valorFixo: z.number().optional(),
  ltv: z.number().optional(),
  ativo: z.boolean().default(true),
});

export type Parceiro = z.infer<typeof parceiroSchema>;

export const custoFixoSchema = z.object({
  id: z.string().optional(),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().min(0, "Valor deve ser positivo"),
  categoria: z.enum([
    "Aluguel",
    "Advogado Fixo",
    "Estagiários",
    "Impostos Patronais",
    "Internet",
    "Energia",
    "Água",
    "Contador",
    "Impostos",
    "Outras Despesas"
  ]),
  diaVencimento: z.number().min(1).max(31),
  ativo: z.boolean().default(true),
});

export type CustoFixo = z.infer<typeof custoFixoSchema>;

export interface MetricasFinanceiras {
  receita: {
    total: number;
    variacao: number;
    honourariosFixos: number;
    honorariosExito: number;
  };
  despesas: {
    total: number;
    variacao: number;
    custosFixos: number;
    custosVariaveis: number;
  };
  saldo: {
    atual: number;
    projetado: number;
    variacao: number;
  };
  contas: {
    aReceber: number;
    aPagar: number;
    vencidas: number;
  };
  parceiros: {
    totalPago: number;
    melhorLtv: Parceiro | null;
  };
}
