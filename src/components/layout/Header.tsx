
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-transparent flex items-center justify-end px-6 flex-shrink-0">
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
