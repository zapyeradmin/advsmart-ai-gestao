
import React from 'react';
import { Users, FileText, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import PermissionGuard from '@/components/auth/PermissionGuard';

const AdminWidgets = () => {
  const { user } = useAuth();

  const adminStats = [
    {
      title: 'Equipe Ativa',
      value: '12',
      icon: Users,
      change: { value: '+2', type: 'increase' as const, label: 'novos este mês' },
      iconColor: 'bg-blue-900/30 text-blue-400'
    },
    {
      title: 'Processos Críticos',
      value: '5',
      icon: AlertTriangle,
      change: { value: '3', type: 'decrease' as const, label: 'prazos hoje' },
      iconColor: 'bg-red-900/30 text-red-400'
    },
    {
      title: 'Produtividade',
      value: '94%',
      icon: TrendingUp,
      change: { value: '+8%', type: 'increase' as const, label: 'vs. mês anterior' },
      iconColor: 'bg-green-900/30 text-green-400'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 89.2k',
      icon: DollarSign,
      change: { value: '+12%', type: 'increase' as const, label: 'vs. meta' },
      iconColor: 'bg-purple-900/30 text-purple-400'
    }
  ];

  const teamActivity = [
    {
      id: 1,
      name: 'Dr. Ricardo Oliveira',
      role: 'Advogado Sênior',
      activity: 'Finalizou contestação do Processo 0001234',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Dra. Camila Santos',
      role: 'Advogada Plena',
      activity: 'Em audiência - Processo 0005678',
      time: '15:00',
      status: 'active'
    },
    {
      id: 3,
      name: 'João Silva',
      role: 'Estagiário',
      activity: 'Preparando documentação para cliente novo',
      time: '13:45',
      status: 'working'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'active':
        return 'bg-blue-900/50 text-blue-400';
      case 'working':
        return 'bg-yellow-900/50 text-yellow-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <PermissionGuard permission="canManageUsers">
      <div className="space-y-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-dark-card rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm ${
                        stat.change.type === 'increase' ? 'text-green-400' : 
                        stat.change.type === 'decrease' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {stat.change.value}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">{stat.change.label}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.iconColor}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Atividade da Equipe</h3>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                Ver Todos
              </Button>
            </div>
            <div className="space-y-4">
              {teamActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{activity.name}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status === 'completed' ? 'Concluído' : 
                         activity.status === 'active' ? 'Ativo' : 'Trabalhando'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{activity.role}</p>
                    <p className="text-sm text-gray-300 mt-1">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center bg-primary hover:bg-primary-hover">
                <Users size={20} className="mb-2" />
                <span className="text-sm">Adicionar Membro</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <FileText size={20} className="mb-2" />
                <span className="text-sm">Novo Processo</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <Calendar size={20} className="mb-2" />
                <span className="text-sm">Agendar Tarefa</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600">
                <DollarSign size={20} className="mb-2" />
                <span className="text-sm">Relatório Financeiro</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};

export default AdminWidgets;
