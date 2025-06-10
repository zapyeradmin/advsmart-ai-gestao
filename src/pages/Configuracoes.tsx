
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ConfiguracoesSidebar from '@/components/configuracoes/ConfiguracoesSidebar';
import ConfiguracoesContent from '@/components/configuracoes/ConfiguracoesContent';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const { toast } = useToast();

  const handleSalvar = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Configurações</h1>
          <p className="text-gray-400">Gerencie as configurações do sistema e preferências</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={handleSalvar}
        >
          <Save size={16} className="mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="flex gap-6">
        <ConfiguracoesSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <ConfiguracoesContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Configuracoes;
