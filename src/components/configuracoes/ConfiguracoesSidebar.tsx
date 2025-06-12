
import React from 'react';
import { Settings, User, Bell, Shield, CreditCard, Database, Palette, Globe } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ConfiguracoesSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ConfiguracoesSidebar = ({ activeTab, onTabChange }: ConfiguracoesSidebarProps) => {
  const tabs: Tab[] = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'assinatura', label: 'Assinatura', icon: CreditCard },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'integracao', label: 'Integrações', icon: Globe }
  ];

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-dark-card rounded-lg border border-gray-800 p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
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
  );
};

export default ConfiguracoesSidebar;
