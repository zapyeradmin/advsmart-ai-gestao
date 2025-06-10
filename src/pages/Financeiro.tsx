
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const transacoes = [
    {
      id: 1,
      tipo: 'Receita',
      descricao: 'Honorários - Maria Silva Santos',
      valor: 2500.00,
      data: '2024-01-10',
      categoria: 'Honorários',
      status: 'Pago',
      cliente: 'Maria Silva Santos'
    },
    {
      id: 2,
      tipo: 'Despesa',
      descricao: 'Aluguel do escritório',
      valor: 4500.00,
      data: '2024-01-05',
      categoria: 'Infraestrutura',
      status: 'Pago',
      cliente: null
    },
    {
      id: 3,
      tipo: 'Receita',
      descricao: 'Consultoria Jurídica - Empresa ABC',
      valor: 8000.00,
      data: '2024-01-08',
      categoria: 'Consultoria',
      status: 'Pendente',
      cliente: 'Empresa ABC Ltda.'
    }
  ];

  const totalReceitas = transacoes.filter(t => t.tipo === 'Receita').reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === 'Despesa').reduce((sum, t) => sum + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const filteredTransacoes = transacoes.filter(transacao =>
    transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transacao.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transacao.cliente && transacao.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNovaTransacao = () => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade será implementada em breve.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Financeiro</h1>
          <p className="text-gray-400">Controle suas receitas, despesas e fluxo de caixa</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={handleNovaTransacao}
        >
          <Plus size={16} className="mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">
                R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-gray-400 text-sm">Total Receitas</div>
            </div>
            <TrendingUp className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-400">
                R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-gray-400 text-sm">Total Despesas</div>
            </div>
            <TrendingDown className="text-red-400" size={24} />
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-gray-400 text-sm">Saldo Atual</div>
            </div>
            <DollarSign className={saldo >= 0 ? 'text-green-400' : 'text-red-400'} size={24} />
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">
            {transacoes.filter(t => t.status === 'Pendente').length}
          </div>
          <div className="text-gray-400 text-sm">Pendências</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar transações..."
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
              Relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Data</th>
                <th className="text-left p-4 text-gray-300 font-medium">Descrição</th>
                <th className="text-left p-4 text-gray-300 font-medium">Categoria</th>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Tipo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Valor</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransacoes.map((transacao) => (
                <tr key={transacao.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar size={12} className="mr-2" />
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="p-4 text-white">{transacao.descricao}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                      {transacao.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{transacao.cliente || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transacao.tipo === 'Receita' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-red-900/50 text-red-400'
                    }`}>
                      {transacao.tipo}
                    </span>
                  </td>
                  <td className={`p-4 font-semibold ${
                    transacao.tipo === 'Receita' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transacao.tipo === 'Receita' ? '+' : '-'}R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transacao.status === 'Pago' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {transacao.status}
                    </span>
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

export default Financeiro;
