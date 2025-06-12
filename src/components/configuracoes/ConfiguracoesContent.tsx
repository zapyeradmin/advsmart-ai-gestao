
import React from 'react';
import ConfiguracoesGeral from './tabs/ConfiguracoesGeral';
import ConfiguracoesPerfil from './tabs/ConfiguracoesPerfil';
import ConfiguracoesNotificacoes from './tabs/ConfiguracoesNotificacoes';
import ConfiguracoesSeguranca from './tabs/ConfiguracoesSeguranca';
import ConfiguracoesAparencia from './tabs/ConfiguracoesAparencia';
import ConfiguracoesIntegracoes from './tabs/ConfiguracoesIntegracoes';

interface ConfiguracoesContentProps {
  activeTab: string;
}

const ConfiguracoesContent = ({ activeTab }: ConfiguracoesContentProps) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'geral':
        return <ConfiguracoesGeral />;
      case 'perfil':
        return <ConfiguracoesPerfil />;
      case 'notificacoes':
        return <ConfiguracoesNotificacoes />;
      case 'seguranca':
        return <ConfiguracoesSeguranca />;
      case 'aparencia':
        return <ConfiguracoesAparencia />;
      case 'integracao':
        return <ConfiguracoesIntegracoes />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Conteúdo da aba será implementado em breve.</p>
          </div>
        );
    }
  };

  return <div className="flex-1">{renderTabContent()}</div>;
};

export default ConfiguracoesContent;
