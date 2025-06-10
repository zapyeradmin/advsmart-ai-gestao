
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TransacaoIntegrada } from '@/types/integration';

export const useCalculoComissoes = () => {
  const { toast } = useToast();

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

  return { calcularComissaoParceiro };
};
