
import { useState, useEffect, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  ClienteIntegrado, 
  ProcessoIntegrado, 
  TransacaoIntegrada, 
  ParceiroIntegrado,
  MetricasConsolidadas,
  RelatorioConsolidado
} from '@/types/integration';

export const useIntegratedData = () => {
  const { toast } = useToast();

  // Estados centralizados
  const [clientes, setClientes] = useState<ClienteIntegrado[]>([]);
  const [processos, setProcessos] = useState<ProcessoIntegrado[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoIntegrada[]>([]);
  const [parceiros, setParceiros] = useState<ParceiroIntegrado[]>([]);
  const [loading, setLoading] = useState(false);

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

    setClientes(dadosIniciais.clientes);
    setProcessos(dadosIniciais.processos);
    setTransacoes(dadosIniciais.transacoes);
    setParceiros(dadosIniciais.parceiros);
  }, []);

  // Métricas consolidadas calculadas
  const metricas = useMemo((): MetricasConsolidadas => {
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

  // Handlers para operações integradas
  const adicionarCliente = (cliente: Omit<ClienteIntegrado, 'id' | 'dataRegistro'>) => {
    const novoCliente: ClienteIntegrado = {
      ...cliente,
      id: `cliente-${Date.now()}`,
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    
    setClientes(prev => [...prev, novoCliente]);
    
    // Atualizar métricas do parceiro indicador se houver
    if (cliente.parceiroIndicador) {
      setParceiros(prev => prev.map(p => 
        p.id === cliente.parceiroIndicador 
          ? { ...p, clientesIndicados: p.clientesIndicados + 1 }
          : p
      ));
    }

    toast({
      title: "Cliente adicionado com sucesso!",
      description: `${cliente.nome} foi cadastrado no sistema.`
    });

    return novoCliente;
  };

  const adicionarProcesso = (processo: Omit<ProcessoIntegrado, 'id'>) => {
    const novoProcesso: ProcessoIntegrado = {
      ...processo,
      id: `processo-${Date.now()}`
    };
    
    setProcessos(prev => [...prev, novoProcesso]);

    // Criar transações financeiras automáticas baseadas no processo
    if (processo.valorEntrada && processo.valorEntrada > 0) {
      const transacaoEntrada: TransacaoIntegrada = {
        id: `transacao-${Date.now()}-entrada`,
        tipo: 'Receita',
        descricao: `Entrada - Processo ${processo.numero}`,
        valor: processo.valorEntrada,
        data: new Date().toISOString().split('T')[0],
        categoria: 'Honorários',
        status: 'Pendente',
        clienteId: processo.clienteId,
        processoId: novoProcesso.id,
        criadoPor: 'Sistema',
        dataCriacao: new Date().toISOString()
      };
      
      setTransacoes(prev => [...prev, transacaoEntrada]);
    }

    toast({
      title: "Processo cadastrado com sucesso!",
      description: `Processo ${processo.numero} foi adicionado ao sistema.`
    });

    return novoProcesso;
  };

  const adicionarTransacao = (transacao: Omit<TransacaoIntegrada, 'id' | 'dataCriacao' | 'criadoPor'>) => {
    const novaTransacao: TransacaoIntegrada = {
      ...transacao,
      id: `transacao-${Date.now()}`,
      dataCriacao: new Date().toISOString(),
      criadoPor: 'Usuário'
    };
    
    setTransacoes(prev => [...prev, novaTransacao]);

    // Atualizar LTV do parceiro se a transação estiver vinculada
    if (transacao.parceiroId && transacao.tipo === 'Receita') {
      setParceiros(prev => prev.map(p => 
        p.id === transacao.parceiroId 
          ? { ...p, valorTotalGerado: p.valorTotalGerado + transacao.valor }
          : p
      ));
    }

    toast({
      title: "Movimentação financeira registrada!",
      description: `${transacao.tipo} de ${transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} foi adicionada.`
    });

    return novaTransacao;
  };

  const adicionarParceiro = (parceiro: Omit<ParceiroIntegrado, 'id' | 'dataRegistro'>) => {
    const novoParceiro: ParceiroIntegrado = {
      ...parceiro,
      id: `parceiro-${Date.now()}`,
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    
    setParceiros(prev => [...prev, novoParceiro]);

    toast({
      title: "Parceiro cadastrado com sucesso!",
      description: `${parceiro.nome} foi adicionado ao sistema.`
    });

    return novoParceiro;
  };

  // Geração de relatório consolidado
  const gerarRelatorioConsolidado = (inicio: string, fim: string): RelatorioConsolidado => {
    const alertas = [];

    // Verificar alertas automáticos
    const prazosVencendo = processos.filter(p => 
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

    const contasVencidas = transacoes.filter(t => 
      t.status === 'Pendente' && 
      t.dataVencimento && 
      new Date(t.dataVencimento) < new Date()
    );

    if (contasVencidas.length > 0) {
      alertas.push({
        tipo: 'error' as const,
        titulo: 'Contas em Atraso',
        descricao: `${contasVencidas.length} transação(ões) em atraso`,
        data: new Date().toISOString()
      });
    }

    return {
      periodo: { inicio, fim },
      metricas,
      tendencias: {
        receitas: [], // Implementar cálculo de tendências
        novosClientes: [],
        processosFinalizados: []
      },
      alertas
    };
  };

  return {
    // Estados
    clientes,
    processos,
    transacoes,
    parceiros,
    loading,
    metricas,
    
    // Handlers
    adicionarCliente,
    adicionarProcesso,
    adicionarTransacao,
    adicionarParceiro,
    gerarRelatorioConsolidado,
    
    // Setters para edição
    setClientes,
    setProcessos,
    setTransacoes,
    setParceiros
  };
};
