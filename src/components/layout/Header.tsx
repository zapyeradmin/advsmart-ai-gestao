
import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings as SettingsIcon, LogOut, Calendar, AlertTriangle, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      icon: Calendar,
      title: 'Audiência em 2 horas',
      subtitle: 'Processo nº 0001234-12.2023.8.26.0100',
      time: '10 minutos atrás',
      type: 'info'
    },
    {
      icon: AlertTriangle,
      title: 'Prazo expirando amanhã',
      subtitle: 'Recurso - Processo nº 0005678-45.2023.8.26.0100',
      time: '1 hora atrás',
      type: 'warning'
    },
    {
      icon: DollarSign,
      title: 'Pagamento recebido',
      subtitle: 'R$ 2.500,00 - Cliente: Empresa ABC Ltda.',
      time: '3 horas atrás',
      type: 'success'
    }
  ];

  return (
    <header className="h-16 bg-dark-surface border-b border-gray-700/20 flex items-center justify-between px-6 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80">
      <div className="flex items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar..."
            className="bg-gray-900/50 text-gray-200 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary text-sm border border-gray-700/20"
          />
          <div className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 flex items-center justify-center">
            <Search size={16} />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700">
              <Bell size={20} />
            </div>
            <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
              3
            </span>
          </Button>

          {showNotifications && (
            <div className="dropdown-content right-0 mt-2 w-80 show">
              <div className="p-3 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Notificações</h3>
                  <span className="text-xs text-primary cursor-pointer">Marcar todas como lidas</span>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <a key={index} href="#" className="p-3 border-b border-gray-700 flex hover:bg-gray-700">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        notification.type === 'info' ? 'bg-blue-100 text-primary' :
                        notification.type === 'warning' ? 'bg-red-100 text-red-500' :
                        'bg-green-100 text-green-500'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-400">{notification.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="p-2 text-center">
                <a href="#" className="text-xs text-primary hover:underline">Ver todas as notificações</a>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-3"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium">Dr. Ricardo Oliveira</p>
              <p className="text-xs text-gray-400">Advogado Sênior</p>
            </div>
            <ChevronDown size={16} />
          </Button>

          {showProfile && (
            <div className="dropdown-content right-0 mt-2 show">
              <a href="#" className="flex items-center">
                <User size={16} className="mr-2" />
                Meu Perfil
              </a>
              <a href="#" className="flex items-center">
                <SettingsIcon size={16} className="mr-2" />
                Configurações
              </a>
              <a href="#" className="flex items-center">
                <LogOut size={16} className="mr-2" />
                Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
