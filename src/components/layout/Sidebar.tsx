
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
  Bot,
  Calculator
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from '@/components/auth/UserProfile';
import PermissionGuard from '@/components/auth/PermissionGuard';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', permission: null },
  { icon: Users, label: 'Clientes', path: '/clientes', permission: 'canManageClients' as const },
  { icon: FileText, label: 'Processos', path: '/processos', permission: 'canManageProcesses' as const },
  { icon: DollarSign, label: 'Financeiro', path: '/financeiro', permission: 'canViewFinancial' as const },
  { icon: Calendar, label: 'Agenda', path: '/agenda', permission: null },
  { icon: File, label: 'Documentos', path: '/documentos', permission: 'canManageDocuments' as const },
  { icon: Calculator, label: 'Calculadoras', path: '/calculadoras', permission: null },
  { icon: UserCheck, label: 'Equipe', path: '/equipe', permission: 'canManageUsers' as const },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios', permission: 'canViewReports' as const },
  { icon: Settings, label: 'Configurações', path: '/configuracoes', permission: 'canManageSettings' as const },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="w-64 h-full bg-dark-sidebar flex-shrink-0 fixed left-0 top-0 z-10 flex flex-col border-r border-dark-border">
      <div className="p-6 flex items-center justify-center border-b border-dark-border/50">
        <h1 className="text-2xl font-pacifico gradient-text">AdvSmart AI</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 custom-scrollbar overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            const menuLink = (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link flex items-center p-3 text-dark-text-secondary rounded-xl transition-all duration-300 group ${
                  isActive ? 'active' : ''
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center mr-4">
                  <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );

            if (item.permission) {
              return (
                <PermissionGuard
                  key={item.path}
                  permission={item.permission}
                  fallback={null}
                >
                  {menuLink}
                </PermissionGuard>
              );
            }

            return menuLink;
          })}
        </div>
        
        <div className="mt-8 border-t border-dark-border pt-6">
          <div className="modern-card p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-dark-accent text-white mr-3">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-dark-text">Assistente IA</h4>
                <p className="text-xs text-dark-text-muted">Sempre pronto para ajudar</p>
              </div>
            </div>
            <p className="text-sm text-dark-text-secondary mb-4">Precisa de ajuda com alguma tarefa? Consulte nossa IA especializada.</p>
            <Button 
              variant="default"
              size="sm"
              className="w-full"
              onClick={() => console.log('AI Modal functionality to be implemented')}
            >
              Consultar IA
            </Button>
          </div>
        </div>
      </nav>
      
      <UserProfile />
    </aside>
  );
};

export default Sidebar;
