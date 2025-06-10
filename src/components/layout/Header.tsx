
import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-dark-surface border-b border-gray-800/20 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center flex-1">
        <div className="relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar clientes, processos..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Settings size={18} />
        </Button>
        
        <div className="flex items-center space-x-2 text-gray-300">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm">{user?.name || 'Usuário'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
