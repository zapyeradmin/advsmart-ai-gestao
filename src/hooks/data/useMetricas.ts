
import { useMemo } from 'react';
import { ClienteIntegrado, ProcessoIntegrado, TransacaoIntegrada, ParceiroIntegrado, MetricasConsolidadas } from '@/types/integration';

export const useMetricas = (
  clientes: ClienteIntegrado[],
  processos: ProcessoIntegrado[],
  transacoes: TransacaoIntegrada[],
  parceiros: ParceiroIntegrado[]
): MetricasConsolidadas => {
  return useMemo(() => {
    const clientesAtivos = clientes.filter(c => c.status === 'Ativo');
    const clientesProspectos = clientes.filter(c => c.status === 'Prospecto');
    
    const receitaTotal = transacoes
      .filter(t => t.tipo === 'Receita' && t.status === 'Pago')
      .reduce((sum, t) => sum + t.valor, 0);
    
    const despesaTotal = transacoes
      .filter(t => t.tipo === 'Despesa' && t.status === 'Pago')
      .reduce((sum, t) => sum + t.valor, 0);

    const processosFinalizados = processos.filter(p => p.status === 'Finalizado');
    const taxaSucesso = processos.length > 0 ? (processosFinalizados.length / processos.length) * 100 : 0;

    return {
      clientes: {
        total: clientes.length,
        ativos: clientesAtivos.length,
        prospectos: clientesProspectos.length,
        novosNoMes: clientes.filter(c => 
          new Date(c.dataRegistro).getMonth() === new Date().getMonth()
        ).length,
        porOrigem: clientes.reduce((acc, cliente) => {
          acc[cliente.origem] = (acc[cliente.origem] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        ltv: clientesAtivos.length > 0 ? receitaTotal / clientesAtivos.length : 0
      },
      processos: {
        total: processos.length,
        emAndamento: processos.filter(p => p.status === 'Em Andamento').length,
        finalizados: processosFinalizados.length,
        porArea: processos.reduce((acc, processo) => {
          acc[processo.area] = (acc[processo.area] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        valorCausaTotal: processos.reduce((sum, p) => 
          sum + (parseFloat(p.valorCausa || '0')), 0),
        taxaSucesso
      },
      financeiro: {
        receitaTotal,
        despesaTotal,
        saldoAtual: receitaTotal - despesaTotal,
        contasAReceber: transacoes
          .filter(t => t.tipo === 'Receita' && t.status === 'Pendente')
          .reduce((sum, t) => sum + t.valor, 0),
        contasAPagar: transacoes
          .filter(t => t.tipo === 'Despesa' && t.status === 'Pendente')
          .reduce((sum, t) => sum + t.valor, 0),
        margemLucratividade: receitaTotal > 0 ? ((receitaTotal - despesaTotal) / receitaTotal) * 100 : 0,
        honorariosFixos: transacoes
          .filter(t => t.categoria === 'Honorários' && t.status === 'Pago')
          .reduce((sum, t) => sum + t.valor, 0),
        honorariosExito: 0
      },
      parceiros: {
        total: parceiros.length,
        ativos: parceiros.filter(p => p.ativo).length,
        valorTotalPago: parceiros.reduce((sum, p) => sum + (p.valorTotalGerado || 0), 0),
        melhorLtv: parceiros.reduce((best, current) => 
          (current.ltv > (best?.ltv || 0)) ? current : best, null as ParceiroIntegrado | null),
        clientesIndicadosTotal: parceiros.reduce((sum, p) => sum + (p.clientesIndicados || 0), 0)
      }
    };
  }, [clientes, processos, transacoes, parceiros]);
};
