
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const roleLabels = {
    admin: 'Administrador',
    advogado: 'Advogado',
    estagiario: 'Estagiário',
    secretario: 'Secretário',
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex items-center space-x-3 mb-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-white text-sm">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-gray-400">{roleLabels[user.role]}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={logout}
      >
        <LogOut size={14} className="mr-2" />
        Sair
      </Button>
    </div>
  );
};

export default UserProfile;
