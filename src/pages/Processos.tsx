
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Processos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const processos = [
    {
      id: 1,
      numero: '0001234-12.2023.8.26.0100',
      cliente: 'Maria Silva Santos',
      area: 'Trabalhista',
      status: 'Em Andamento',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 15.000,00',
      dataDistribuicao: '2023-10-15',
      proximoPrazo: '2024-01-20',
      urgencia: 'Normal'
    },
    {
      id: 2,
      numero: '0005678-45.2023.8.26.0100',
      cliente: 'Empresa ABC Ltda.',
      area: 'Empresarial',
      status: 'Aguardando',
      responsavel: 'Dra. Camila Santos',
      valorCausa: 'R$ 50.000,00',
      dataDistribuicao: '2023-11-02',
      proximoPrazo: '2024-01-15',
      urgencia: 'Alta'
    },
    {
      id: 3,
      numero: '0009876-54.2023.8.26.0100',
      cliente: 'João Carlos Mendes',
      area: 'Cível',
      status: 'Finalizado',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 25.000,00',
      dataDistribuicao: '2023-09-20',
      proximoPrazo: null,
      urgencia: 'Normal'
    }
  ];

  const filteredProcessos = processos.filter(processo =>
    processo.numero.includes(searchTerm) ||
    processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoProcesso = () => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade será implementada em breve.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Processos</h1>
          <p className="text-gray-400">Gerencie todos os processos jurídicos e acompanhe seu andamento</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={handleNovoProcesso}
        >
          <Plus size={16} className="mr-2" />
          Novo Processo
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar por número, cliente ou área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-white">{processos.length}</div>
          <div className="text-gray-400 text-sm">Total de Processos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-blue-400">{processos.filter(p => p.status === 'Em Andamento').length}</div>
          <div className="text-gray-400 text-sm">Em Andamento</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">{processos.filter(p => p.status === 'Aguardando').length}</div>
          <div className="text-gray-400 text-sm">Aguardando</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{processos.filter(p => p.status === 'Finalizado').length}</div>
          <div className="text-gray-400 text-sm">Finalizados</div>
        </div>
      </div>

      {/* Processes Table */}
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Número do Processo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Área</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Responsável</th>
                <th className="text-left p-4 text-gray-300 font-medium">Valor da Causa</th>
                <th className="text-left p-4 text-gray-300 font-medium">Próximo Prazo</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcessos.map((processo) => (
                <tr key={processo.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div className="font-mono text-sm text-white">{processo.numero}</div>
                  </td>
                  <td className="p-4 text-gray-300">{processo.cliente}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                      {processo.area}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      processo.status === 'Em Andamento' 
                        ? 'bg-blue-900/50 text-blue-400' 
                        : processo.status === 'Aguardando'
                        ? 'bg-yellow-900/50 text-yellow-400'
                        : 'bg-green-900/50 text-green-400'
                    }`}>
                      {processo.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{processo.responsavel}</td>
                  <td className="p-4 text-gray-300">{processo.valorCausa}</td>
                  <td className="p-4">
                    {processo.proximoPrazo ? (
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1 text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {new Date(processo.proximoPrazo).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Processos;
