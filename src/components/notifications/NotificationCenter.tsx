
import React, { useState } from 'react';
import { Bell, X, Check, Clock, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Prazo Processual',
      message: 'Audiência marcada para hoje às 14:30 - Processo 0001234-12.2023',
      type: 'urgent',
      timestamp: '2025-06-10T10:00:00',
      read: false,
    },
    {
      id: '2',
      title: 'Nova Tarefa',
      message: 'Dr. Ricardo atribuiu uma nova tarefa para você',
      type: 'info',
      timestamp: '2025-06-10T09:30:00',
      read: false,
    },
    {
      id: '3',
      title: 'Pagamento Recebido',
      message: 'Pagamento de R$ 2.500,00 confirmado - Cliente João Silva',
      type: 'success',
      timestamp: '2025-06-10T08:15:00',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Sucesso",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'warning':
        return <Clock size={16} className="text-yellow-400" />;
      case 'success':
        return <Check size={16} className="text-green-400" />;
      default:
        return <Bell size={16} className="text-blue-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-900/10';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-900/10';
      case 'success':
        return 'border-l-green-500 bg-green-900/10';
      default:
        return 'border-l-blue-500 bg-blue-900/10';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative text-gray-400 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-dark-card border border-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Notificações</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-blue-400"
                  >
                    Marcar todas como lidas
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                Nenhuma notificação
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getTypeColor(notification.type)} ${
                    !notification.read ? 'bg-gray-800/50' : ''
                  } border-b border-gray-800 last:border-b-0 hover:bg-gray-800/30 cursor-pointer`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-white' : 'text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
