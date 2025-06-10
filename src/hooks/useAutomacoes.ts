
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClienteIntegrado, ProcessoIntegrado, TransacaoIntegrada } from '@/types/integration';

export const useAutomacoes = () => {
  const { toast } = useToast();

  // Automação: Cliente → Processo
  const vincularClienteProcesso = useCallback((cliente: ClienteIntegrado, processo: ProcessoIntegrado) => {
    // Validações automáticas
    if (cliente.status !== 'Ativo') {
      toast({
        title: "Atenção",
        description: "Cliente deve estar ativo para vincular processos.",
        variant: "destructive"
      });
      return false;
    }

    // Criar tags automáticas baseadas na área do processo
    const novasTags = [...cliente.tags];
    if (!novasTags.includes(processo.area)) {
      novasTags.push(processo.area);
    }

    toast({
      title: "Vinculação realizada!",
      description: `Processo ${processo.numero} vinculado ao cliente ${cliente.nome}.`
    });

    return { cliente: { ...cliente, tags: novasTags }, processo };
  }, [toast]);

  // Automação: Processo → Transações Financeiras
  const gerarTransacoesProcesso = useCallback((processo: ProcessoIntegrado): TransacaoIntegrada[] => {
    const transacoes: TransacaoIntegrada[] = [];
    const agora = new Date().toISOString();

    // Gerar entrada se especificada
    if (processo.valorEntrada && processo.valorEntrada > 0) {
      transacoes.push({
        id: `auto-entrada-${processo.id}`,
        tipo: 'Receita',
        descricao: `Entrada - ${processo.assunto}`,
        valor: processo.valorEntrada,
        data: new Date().toISOString().split('T')[0],
        categoria: 'Honorários',
        status: 'Pendente',
        clienteId: processo.clienteId,
        processoId: processo.id,
        criadoPor: 'Automação',
        dataCriacao: agora
      });
    }

    // Gerar parcelas para honorários fixos
    if (processo.formaCobranca === 'Honorários Fixos' && processo.valorFixo && processo.numParcelas) {
      const valorParcela = processo.valorFixo / processo.numParcelas;
      
      for (let i = 1; i <= processo.numParcelas; i++) {
        const dataVencimento = new Date();
        dataVencimento.setMonth(dataVencimento.getMonth() + i);
        
        transacoes.push({
          id: `auto-parcela-${processo.id}-${i}`,
          tipo: 'Receita',
          descricao: `Parcela ${i}/${processo.numParcelas} - ${processo.assunto}`,
          valor: valorParcela,
          data: new Date().toISOString().split('T')[0],
          dataVencimento: dataVencimento.toISOString().split('T')[0],
          categoria: 'Honorários',
          status: 'Pendente',
          clienteId: processo.clienteId,
          processoId: processo.id,
          criadoPor: 'Automação',
          dataCriacao: agora
        });
      }
    }

    // Gerar custos de atos processuais se especificado
    if (processo.valorAtosProcessuais && processo.valorAtosProcessuais > 0) {
      transacoes.push({
        id: `auto-atos-${processo.id}`,
        tipo: 'Despesa',
        descricao: `Atos Processuais - ${processo.assunto}`,
        valor: processo.valorAtosProcessuais,
        data: new Date().toISOString().split('T')[0],
        categoria: 'Custos Processuais',
        status: 'Pendente',
        clienteId: processo.clienteId,
        processoId: processo.id,
        criadoPor: 'Automação',
        dataCriacao: agora
      });
    }

    if (transacoes.length > 0) {
      toast({
        title: "Transações geradas automaticamente!",
        description: `${transacoes.length} transação(ões) criada(s) para o processo ${processo.numero}.`
      });
    }

    return transacoes;
  }, [toast]);

  // Automação: Calcular comissões de parceiros
  const calcularComissaoParceiro = useCallback((
    transacao: TransacaoIntegrada,
    percentual: number,
    valorFixo?: number
  ): TransacaoIntegrada | null => {
    if (transacao.tipo !== 'Receita' || transacao.status !== 'Pago') {
      return null;
    }

    const valorComissao = valorFixo || (transacao.valor * percentual / 100);
    
    const comissao: TransacaoIntegrada = {
      id: `comissao-${transacao.id}`,
      tipo: 'Despesa',
      descricao: `Comissão - ${transacao.descricao}`,
      valor: valorComissao,
      data: transacao.data,
      categoria: 'Comissões',
      status: 'Pendente',
      clienteId: transacao.clienteId,
      processoId: transacao.processoId,
      parceiroId: transacao.parceiroId,
      criadoPor: 'Automação',
      dataCriacao: new Date().toISOString()
    };

    toast({
      title: "Comissão calculada!",
      description: `Comissão de ${valorComissao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} gerada.`
    });

    return comissao;
  }, [toast]);

  // Automação: Alertas inteligentes
  const verificarAlertas = useCallback((
    clientes: ClienteIntegrado[],
    processos: ProcessoIntegrado[],
    transacoes: TransacaoIntegrada[]
  ) => {
    const alertas = [];

    // Verificar clientes sem contato há muito tempo
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

    // Verificar processos sem movimentação
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

    // Verificar inadimplência
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

  return {
    vincularClienteProcesso,
    gerarTransacoesProcesso,
    calcularComissaoParceiro,
    verificarAlertas
  };
};
