
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Calendar, 
  File, 
  UserCheck, 
  BarChart3, 
  Settings,
  Bot
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: FileText, label: 'Processos', path: '/processos' },
  { icon: DollarSign, label: 'Financeiro', path: '/financeiro' },
  { icon: Calendar, label: 'Agenda', path: '/agenda' },
  { icon: File, label: 'Documentos', path: '/documentos' },
  { icon: UserCheck, label: 'Equipe', path: '/equipe' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-full bg-dark-surface flex-shrink-0 fixed left-0 top-0 z-10">
      <div className="p-4 flex items-center justify-center border-b border-gray-700/20">
        <h1 className="text-2xl font-pacifico text-white">AdvSmart AI</h1>
      </div>
      
      <nav className="mt-6 px-4 custom-scrollbar overflow-y-auto h-[calc(100vh-80px)]">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link flex items-center p-3 text-gray-200 rounded-md hover:bg-gray-700 transition-all duration-200 ${
                  isActive ? 'active' : ''
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Icon size={18} />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white mr-2">
                <Bot size={16} />
              </div>
              <span className="font-medium">Assistente IA</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Precisa de ajuda com alguma tarefa?</p>
            <Button 
              className="w-full bg-primary text-white py-2 px-3 rounded-button text-sm hover:bg-primary-hover transition-colors"
              onClick={() => window.openAIModal?.()}
            >
              Consultar IA
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
