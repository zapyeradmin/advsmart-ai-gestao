
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProcessoIntegrado, TransacaoIntegrada } from '@/types/integration';

export const useGeracaoTransacoes = () => {
  const { toast } = useToast();

  const gerarTransacoesProcesso = useCallback((processo: ProcessoIntegrado): TransacaoIntegrada[] => {
    const transacoes: TransacaoIntegrada[] = [];
    const agora = new Date().toISOString();

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

  return { gerarTransacoesProcesso };
};
