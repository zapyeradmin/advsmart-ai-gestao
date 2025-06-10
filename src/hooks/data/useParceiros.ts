
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ParceiroIntegrado } from '@/types/integration';

export const useParceiros = () => {
  const { toast } = useToast();
  const [parceiros, setParceiros] = useState<ParceiroIntegrado[]>([]);

  const adicionarParceiro = useCallback((parceiro: Omit<ParceiroIntegrado, 'id' | 'dataRegistro'>) => {
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
  }, [toast]);

  const atualizarParceiro = useCallback((id: string, dadosAtualizados: Partial<ParceiroIntegrado>) => {
    setParceiros(prev => prev.map(parceiro => 
      parceiro.id === id ? { ...parceiro, ...dadosAtualizados } : parceiro
    ));
  }, []);

  const atualizarLtvParceiro = useCallback((parceiroId: string, valor: number) => {
    setParceiros(prev => prev.map(p => 
      p.id === parceiroId 
        ? { ...p, valorTotalGerado: p.valorTotalGerado + valor }
        : p
    ));
  }, []);

  return {
    parceiros,
    setParceiros,
    adicionarParceiro,
    atualizarParceiro,
    atualizarLtvParceiro
  };
};
