
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProcessoIntegrado, TransacaoIntegrada } from '@/types/integration';

export const useProcessos = () => {
  const { toast } = useToast();
  const [processos, setProcessos] = useState<ProcessoIntegrado[]>([]);

  const adicionarProcesso = useCallback((
    processo: Omit<ProcessoIntegrado, 'id'>,
    onTransacaoCriada?: (transacao: TransacaoIntegrada) => void
  ) => {
    const novoProcesso: ProcessoIntegrado = {
      ...processo,
      id: `processo-${Date.now()}`
    };
    
    setProcessos(prev => [...prev, novoProcesso]);

    // Criar transação de entrada se especificada
    if (processo.valorEntrada && processo.valorEntrada > 0 && onTransacaoCriada) {
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
      
      onTransacaoCriada(transacaoEntrada);
    }

    toast({
      title: "Processo cadastrado com sucesso!",
      description: `Processo ${processo.numero} foi adicionado ao sistema.`
    });

    return novoProcesso;
  }, [toast]);

  const editarProcesso = useCallback((id: string, dadosAtualizados: Partial<ProcessoIntegrado>) => {
    setProcessos(prev => prev.map(processo => 
      processo.id === id ? { ...processo, ...dadosAtualizados } : processo
    ));
  }, []);

  const removerProcesso = useCallback((id: string) => {
    setProcessos(prev => prev.filter(processo => processo.id !== id));
    toast({
      title: "Processo removido",
      description: "Processo foi removido do sistema."
    });
  }, [toast]);

  return {
    processos,
    setProcessos,
    adicionarProcesso,
    editarProcesso,
    removerProcesso
  };
};
