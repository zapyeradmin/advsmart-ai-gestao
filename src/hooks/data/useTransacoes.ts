
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TransacaoIntegrada } from '@/types/integration';

export const useTransacoes = () => {
  const { toast } = useToast();
  const [transacoes, setTransacoes] = useState<TransacaoIntegrada[]>([]);

  const adicionarTransacao = useCallback((
    transacao: Omit<TransacaoIntegrada, 'id' | 'dataCriacao' | 'criadoPor'>,
    onParceiroAtualizado?: (parceiroId: string, valor: number) => void
  ) => {
    const novaTransacao: TransacaoIntegrada = {
      ...transacao,
      id: `transacao-${Date.now()}`,
      dataCriacao: new Date().toISOString(),
      criadoPor: 'Usuário'
    };
    
    setTransacoes(prev => [...prev, novaTransacao]);

    // Atualizar LTV do parceiro se aplicável
    if (transacao.parceiroId && transacao.tipo === 'Receita' && onParceiroAtualizado) {
      onParceiroAtualizado(transacao.parceiroId, transacao.valor);
    }

    toast({
      title: "Movimentação financeira registrada!",
      description: `${transacao.tipo} de ${transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} foi adicionada.`
    });

    return novaTransacao;
  }, [toast]);

  const editarTransacao = useCallback((id: string, dadosAtualizados: Partial<TransacaoIntegrada>) => {
    setTransacoes(prev => prev.map(transacao => 
      transacao.id === id ? { ...transacao, ...dadosAtualizados } : transacao
    ));
  }, []);

  const removerTransacao = useCallback((id: string) => {
    setTransacoes(prev => prev.filter(transacao => transacao.id !== id));
    toast({
      title: "Transação removida",
      description: "Transação foi removida do sistema."
    });
  }, [toast]);

  return {
    transacoes,
    setTransacoes,
    adicionarTransacao,
    editarTransacao,
    removerTransacao
  };
};
