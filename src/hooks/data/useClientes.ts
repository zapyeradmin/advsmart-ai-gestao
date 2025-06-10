
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClienteIntegrado } from '@/types/integration';

export const useClientes = () => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<ClienteIntegrado[]>([]);

  const adicionarCliente = useCallback((cliente: Omit<ClienteIntegrado, 'id' | 'dataRegistro'>) => {
    const novoCliente: ClienteIntegrado = {
      ...cliente,
      id: `cliente-${Date.now()}`,
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    
    setClientes(prev => [...prev, novoCliente]);

    toast({
      title: "Cliente adicionado com sucesso!",
      description: `${cliente.nome} foi cadastrado no sistema.`
    });

    return novoCliente;
  }, [toast]);

  const editarCliente = useCallback((id: string, dadosAtualizados: Partial<ClienteIntegrado>) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === id ? { ...cliente, ...dadosAtualizados } : cliente
    ));
  }, []);

  const removerCliente = useCallback((id: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
    toast({
      title: "Cliente removido",
      description: "Cliente foi removido do sistema."
    });
  }, [toast]);

  return {
    clientes,
    setClientes,
    adicionarCliente,
    editarCliente,
    removerCliente
  };
};
