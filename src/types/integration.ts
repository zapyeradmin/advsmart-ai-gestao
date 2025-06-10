
import { z } from "zod";

// Schema para cliente integrado
export const clienteIntegradoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  tipo: z.enum(["PF", "PJ"]),
  documento: z.string(),
  email: z.string().email(),
  telefone: z.string(),
  status: z.enum(["Ativo", "Prospecto", "Inativo"]),
  origem: z.string(),
  parceiroIndicador: z.string().optional(),
  prioridade: z.enum(["baixa", "normal", "alta", "urgente"]),
  tags: z.array(z.string()),
  endereco: z.object({
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string()
  }).optional(),
  dataRegistro: z.string(),
  ultimoContato: z.string().optional(),
  observacoes: z.string().optional()
});

// Schema para processo integrado
export const processoIntegradoSchema = z.object({
  id: z.string(),
  numero: z.string(),
  clienteId: z.string(),
  area: z.string(),
  instancia: z.string(),
  comarca: z.string(),
  vara: z.string().optional(),
  assunto: z.string(),
  status: z.enum(["Em Andamento", "Aguardando", "Finalizado", "Suspenso"]),
  responsavel: z.string(),
  valorCausa: z.string().optional(),
  dataDistribuicao: z.string(),
  proximoPrazo: z.string().optional(),
  proximaAudiencia: z.string().optional(),
  urgencia: z.enum(["Normal", "Alta", "Urgente"]),
  // Integração financeira
  formaCobranca: z.enum(["Honorários Fixos", "Honorários de Êxito", "Misto"]),
  valorFixo: z.number().optional(),
  percentualExito: z.number().optional(),
  valorEntrada: z.number().optional(),
  valorAtosProcessuais: z.number().optional(),
  modoPagamento: z.string().optional(),
  numParcelas: z.number().optional(),
  observacoes: z.string().optional()
});

// Schema para transação financeira integrada
export const transacaoIntegradaSchema = z.object({
  id: z.string(),
  tipo: z.enum(["Receita", "Despesa"]),
  descricao: z.string(),
  valor: z.number(),
  data: z.string(),
  dataVencimento: z.string().optional(),
  categoria: z.string(),
  subcategoria: z.string().optional(),
  status: z.enum(["Pago", "Pendente", "Vencido"]),
  // Integração com outros módulos
  clienteId: z.string().optional(),
  processoId: z.string().optional(),
  parceiroId: z.string().optional(),
  observacoes: z.string().optional(),
  // Campos de auditoria
  criadoPor: z.string(),
  dataCriacao: z.string(),
  atualizadoPor: z.string().optional(),
  dataAtualizacao: z.string().optional()
});

// Schema para parceiro integrado
export const parceiroIntegradoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  tipo: z.enum(["Advogado", "Captador", "Rede Social", "Anúncios", "Outros"]),
  contato: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  // Configurações financeiras
  percentual: z.number().optional(),
  valorFixo: z.number().optional(),
  // Métricas
  ltv: z.number().default(0),
  clientesIndicados: z.number().default(0),
  valorTotalGerado: z.number().default(0),
  ativo: z.boolean().default(true),
  dataRegistro: z.string(),
  observacoes: z.string().optional()
});

// Tipos inferidos
export type ClienteIntegrado = z.infer<typeof clienteIntegradoSchema>;
export type ProcessoIntegrado = z.infer<typeof processoIntegradoSchema>;
export type TransacaoIntegrada = z.infer<typeof transacaoIntegradaSchema>;
export type ParceiroIntegrado = z.infer<typeof parceiroIntegradoSchema>;

// Interface para métricas consolidadas
export interface MetricasConsolidadas {
  clientes: {
    total: number;
    ativos: number;
    prospectos: number;
    novosNoMes: number;
    porOrigem: Record<string, number>;
    ltv: number;
  };
  processos: {
    total: number;
    emAndamento: number;
    finalizados: number;
    porArea: Record<string, number>;
    valorCausaTotal: number;
    taxaSucesso: number;
  };
  financeiro: {
    receitaTotal: number;
    despesaTotal: number;
    saldoAtual: number;
    contasAReceber: number;
    contasAPagar: number;
    margemLucratividade: number;
    honorariosFixos: number;
    honorariosExito: number;
  };
  parceiros: {
    total: number;
    ativos: number;
    valorTotalPago: number;
    melhorLtv: ParceiroIntegrado | null;
    clientesIndicadosTotal: number;
  };
}

// Interface para relatório consolidado
export interface RelatorioConsolidado {
  periodo: {
    inicio: string;
    fim: string;
  };
  metricas: MetricasConsolidadas;
  tendencias: {
    receitas: Array<{ mes: string; valor: number }>;
    novosClientes: Array<{ mes: string; quantidade: number }>;
    processosFinalizados: Array<{ mes: string; quantidade: number }>;
  };
  alertas: Array<{
    tipo: 'warning' | 'error' | 'info';
    titulo: string;
    descricao: string;
    data: string;
  }>;
}
