
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Settings, User, Bell, Shield, CreditCard, Database, Palette, Globe, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const { toast } = useToast();

  const tabs = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'assinatura', label: 'Assinatura', icon: CreditCard },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'integracao', label: 'Integrações', icon: Globe }
  ];

  const handleSalvar = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'geral':
        return (
          <div className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Informações do Escritório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nome do Escritório</label>
                    <Input defaultValue="AdvSmart AI" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">CNPJ</label>
                    <Input defaultValue="12.345.678/0001-90" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefone</label>
                    <Input defaultValue="(11) 3333-4444" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
                    <Input defaultValue="contato@advsmartai.com" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Endereço</label>
                  <Textarea 
                    defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Informações do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    Alterar Foto
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                    <Input defaultValue="Dr. Ricardo Oliveira" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">OAB</label>
                    <Input defaultValue="SP 123.456" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
                    <Input defaultValue="ricardo@advsmartai.com" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefone</label>
                    <Input defaultValue="(11) 99999-1111" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Notificações por E-mail</p>
                      <p className="text-gray-400 text-sm">Receber atualizações importantes por e-mail</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Lembretes de Prazos</p>
                      <p className="text-gray-400 text-sm">Alertas sobre prazos próximos do vencimento</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Notificações de Pagamento</p>
                      <p className="text-gray-400 text-sm">Alertas sobre pagamentos recebidos</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'seguranca':
        return (
          <div className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Senha Atual</label>
                  <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nova Senha</label>
                  <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Confirmar Nova Senha</label>
                  <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-white font-medium">Autenticação em Duas Etapas</p>
                    <p className="text-gray-400 text-sm">Adicione uma camada extra de segurança</p>
                  </div>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'aparencia':
        return (
          <div className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Preferências de Aparência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Tema</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg border-2 border-primary cursor-pointer">
                      <div className="w-full h-16 bg-gray-900 rounded mb-2"></div>
                      <p className="text-sm text-center text-white">Escuro</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border-2 border-gray-700 cursor-pointer">
                      <div className="w-full h-16 bg-gray-100 rounded mb-2"></div>
                      <p className="text-sm text-center text-gray-400">Claro</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border-2 border-gray-700 cursor-pointer">
                      <div className="w-full h-16 bg-gradient-to-r from-gray-900 to-gray-100 rounded mb-2"></div>
                      <p className="text-sm text-center text-gray-400">Auto</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Conteúdo da aba será implementado em breve.</p>
          </div>
        );
    }
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
        {/* Sidebar de Configurações */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-dark-card rounded-lg border border-gray-800 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center p-3 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary/20 text-primary border-l-2 border-primary'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} className="mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo da Configuração */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
