
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClienteIntegrado, ProcessoIntegrado } from '@/types/integration';

export const useVinculacaoAutomatica = () => {
  const { toast } = useToast();

  const vincularClienteProcesso = useCallback((cliente: ClienteIntegrado, processo: ProcessoIntegrado) => {
    if (cliente.status !== 'Ativo') {
      toast({
        title: "Atenção",
        description: "Cliente deve estar ativo para vincular processos.",
        variant: "destructive"
      });
      return false;
    }

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

  return { vincularClienteProcesso };
};
