
import { useVinculacaoAutomatica } from './automacao/useVinculacaoAutomatica';
import { useGeracaoTransacoes } from './automacao/useGeracaoTransacoes';
import { useCalculoComissoes } from './automacao/useCalculoComissoes';
import { useAlertasInteligentes } from './automacao/useAlertasInteligentes';

export const useAutomacoes = () => {
  const { vincularClienteProcesso } = useVinculacaoAutomatica();
  const { gerarTransacoesProcesso } = useGeracaoTransacoes();
  const { calcularComissaoParceiro } = useCalculoComissoes();
  const { verificarAlertas } = useAlertasInteligentes();

  return {
    vincularClienteProcesso,
    gerarTransacoesProcesso,
    calcularComissaoParceiro,
    verificarAlertas
  };
};
