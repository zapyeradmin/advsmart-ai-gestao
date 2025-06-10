
import { useEffect } from 'react';
import { RelatorioConsolidado } from '@/types/integration';
import { useClientes } from './data/useClientes';
import { useProcessos } from './data/useProcessos';
import { useTransacoes } from './data/useTransacoes';
import { useParceiros } from './data/useParceiros';
import { useMetricas } from './data/useMetricas';

export const useIntegratedData = () => {
  const clientesHook = useClientes();
  const processosHook = useProcessos();
  const transacoesHook = useTransacoes();
  const parceirosHook = useParceiros();

  // Simulação de dados iniciais
  useEffect(() => {
    const dadosIniciais = {
      clientes: [
        {
          id: '1',
          nome: 'Maria Silva Santos',
          tipo: 'PF' as const,
          documento: '123.456.789-00',
          email: 'maria.silva@email.com',
          telefone: '(11) 99999-9999',
          status: 'Ativo' as const,
          origem: 'Indicação de Cliente',
          parceiroIndicador: '1',
          prioridade: 'alta' as const,
          tags: ['VIP', 'Trabalhista'],
          dataRegistro: '2024-01-15',
          ultimoContato: '2024-06-08'
        },
        {
          id: '2',
          nome: 'Empresa ABC Ltda.',
          tipo: 'PJ' as const,
          documento: '12.345.678/0001-90',
          email: 'contato@empresaabc.com.br',
          telefone: '(11) 3333-4444',
          status: 'Ativo' as const,
          origem: 'Site/Internet',
          prioridade: 'normal' as const,
          tags: ['Empresarial'],
          dataRegistro: '2024-02-10',
          ultimoContato: '2024-06-10'
        }
      ],
      processos: [
        {
          id: '1',
          numero: '0001234-12.2023.8.26.0100',
          clienteId: '1',
          area: 'Trabalhista',
          instancia: '1ª Instância',
          comarca: 'São Paulo',
          vara: '3ª Vara do Trabalho',
          assunto: 'Rescisão Indireta de Contrato de Trabalho',
          status: 'Em Andamento' as const,
          responsavel: 'Dr. Ricardo Oliveira',
          valorCausa: '15000',
          dataDistribuicao: '2023-10-15',
          proximoPrazo: '2024-06-20',
          urgencia: 'Normal' as const,
          formaCobranca: 'Honorários Fixos' as const,
          valorFixo: 2500,
          valorEntrada: 1000
        }
      ],
      transacoes: [
        {
          id: '1',
          tipo: 'Receita' as const,
          descricao: 'Honorários - Processo 0001234-12.2023',
          valor: 2500,
          data: '2024-06-01',
          categoria: 'Honorários',
          status: 'Pago' as const,
          clienteId: '1',
          processoId: '1',
          criadoPor: 'Sistema',
          dataCriacao: '2024-06-01'
        }
      ],
      parceiros: [
        {
          id: '1',
          nome: 'Dr. Carlos Silva',
          tipo: 'Advogado' as const,
          contato: 'carlos@exemplo.com',
          percentual: 20,
          ltv: 15000,
          clientesIndicados: 5,
          valorTotalGerado: 45000,
          ativo: true,
          dataRegistro: '2024-01-01'
        }
      ]
    };

    clientesHook.setClientes(dadosIniciais.clientes);
    processosHook.setProcessos(dadosIniciais.processos);
    transacoesHook.setTransacoes(dadosIniciais.transacoes);
    parceirosHook.setParceiros(dadosIniciais.parceiros);
  }, []);

  const metricas = useMetricas(
    clientesHook.clientes,
    processosHook.processos,
    transacoesHook.transacoes,
    parceirosHook.parceiros
  );

  const gerarRelatorioConsolidado = (inicio: string, fim: string): RelatorioConsolidado => {
    const alertas = [];

    const prazosVencendo = processosHook.processos.filter(p => 
      p.proximoPrazo && new Date(p.proximoPrazo) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    if (prazosVencendo.length > 0) {
      alertas.push({
        tipo: 'warning' as const,
        titulo: 'Prazos Vencendo',
        descricao: `${prazosVencendo.length} processo(s) com prazos nos próximos 7 dias`,
        data: new Date().toISOString()
      });
    }

    return {
      periodo: { inicio, fim },
      metricas,
      tendencias: {
        receitas: [],
        novosClientes: [],
        processosFinalizados: []
      },
      alertas
    };
  };

  return {
    ...clientesHook,
    ...processosHook,
    ...transacoesHook,
    ...parceirosHook,
    metricas,
    gerarRelatorioConsolidado,
    loading: false
  };
};
