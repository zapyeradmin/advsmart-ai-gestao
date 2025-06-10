
import { useCallback } from 'react';
import { ClienteIntegrado, ProcessoIntegrado, TransacaoIntegrada } from '@/types/integration';

export const useAlertasInteligentes = () => {
  const verificarAlertas = useCallback((
    clientes: ClienteIntegrado[],
    processos: ProcessoIntegrado[],
    transacoes: TransacaoIntegrada[]
  ) => {
    const alertas = [];

    const clientesSemContato = clientes.filter(cliente => {
      if (!cliente.ultimoContato) return true;
      const diasSemContato = Math.floor(
        (Date.now() - new Date(cliente.ultimoContato).getTime()) / (1000 * 60 * 60 * 24)
      );
      return diasSemContato > 30;
    });

    if (clientesSemContato.length > 0) {
      alertas.push({
        tipo: 'warning' as const,
        titulo: 'Clientes sem contato',
        descricao: `${clientesSemContato.length} cliente(s) sem contato há mais de 30 dias`,
        acao: 'Agendar follow-up'
      });
    }

    const processosSemMovimentacao = processos.filter(processo => {
      const transacoesProcesso = transacoes.filter(t => t.processoId === processo.id);
      return transacoesProcesso.length === 0 && processo.status === 'Em Andamento';
    });

    if (processosSemMovimentacao.length > 0) {
      alertas.push({
        tipo: 'info' as const,
        titulo: 'Processos sem movimentação financeira',
        descricao: `${processosSemMovimentacao.length} processo(s) sem lançamentos financeiros`,
        acao: 'Revisar cobrança'
      });
    }

    const transacoesVencidas = transacoes.filter(t => 
      t.status === 'Pendente' && 
      t.dataVencimento && 
      new Date(t.dataVencimento) < new Date()
    );

    if (transacoesVencidas.length > 0) {
      alertas.push({
        tipo: 'error' as const,
        titulo: 'Contas em atraso',
        descricao: `${transacoesVencidas.length} transação(ões) vencida(s)`,
        acao: 'Executar cobrança'
      });
    }

    return alertas;
  }, []);

  return { verificarAlertas };
};
