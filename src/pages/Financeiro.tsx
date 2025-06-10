
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ContasManager from '@/components/financial/ContasManager';
import CustosFixosManager from '@/components/financial/CustosFixosManager';
import ParceirosManager from '@/components/financial/ParceirosManager';
import MetricasFinanceiras from '@/components/financial/MetricasFinanceiras';
import { Transacao, Parceiro, CustoFixo } from '@/types/financial';

const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Estados para dados financeiros
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: '1',
      tipo: 'Receita',
      descricao: 'Honorários - Maria Silva Santos',
      valor: 2500.00,
      data: '2024-01-10',
      categoria: 'Honorários',
      status: 'Pago',
      cliente: 'Maria Silva Santos'
    },
    {
      id: '2',
      tipo: 'Despesa',
      descricao: 'Aluguel do escritório',
      valor: 4500.00,
      data: '2024-01-05',
      categoria: 'Infraestrutura',
      status: 'Pago',
    },
    {
      id: '3',
      tipo: 'Receita',
      descricao: 'Consultoria Jurídica - Empresa ABC',
      valor: 8000.00,
      data: '2024-01-08',
      dataVencimento: '2024-02-08',
      categoria: 'Consultoria',
      status: 'Pendente',
      cliente: 'Empresa ABC Ltda.'
    }
  ]);

  const [custosFixos, setCustosFixos] = useState<CustoFixo[]>([
    {
      id: '1',
      descricao: 'Aluguel do Escritório',
      valor: 4500.00,
      categoria: 'Aluguel',
      diaVencimento: 10,
      ativo: true
    },
    {
      id: '2',
      descricao: 'Internet',
      valor: 150.00,
      categoria: 'Internet',
      diaVencimento: 15,
      ativo: true
    }
  ]);

  const [parceiros, setParceiros] = useState<Parceiro[]>([
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      tipo: 'Advogado',
      contato: 'carlos@exemplo.com',
      percentual: 20,
      ltv: 15000,
      ativo: true
    },
    {
      id: '2',
      nome: 'Ana Captadora',
      tipo: 'Captador',
      contato: '(11) 99999-9999',
      valorFixo: 500,
      ltv: 8000,
      ativo: true
    }
  ]);

  // Handlers para transações
  const handleAddTransacao = (transacao: Transacao) => {
    setTransacoes(prev => [...prev, transacao]);
  };

  const handleUpdateTransacao = (id: string, transacao: Transacao) => {
    setTransacoes(prev => prev.map(t => t.id === id ? { ...transacao, id } : t));
  };

  // Handlers para custos fixos
  const handleAddCusto = (custo: CustoFixo) => {
    setCustosFixos(prev => [...prev, custo]);
  };

  const handleUpdateCusto = (id: string, custo: CustoFixo) => {
    setCustosFixos(prev => prev.map(c => c.id === id ? { ...custo, id } : c));
  };

  const handleDeleteCusto = (id: string) => {
    setCustosFixos(prev => prev.filter(c => c.id !== id));
    toast({ title: "Custo fixo removido com sucesso!" });
  };

  // Handlers para parceiros
  const handleAddParceiro = (parceiro: Parceiro) => {
    setParceiros(prev => [...prev, parceiro]);
  };

  const handleUpdateParceiro = (id: string, parceiro: Parceiro) => {
    setParceiros(prev => prev.map(p => p.id === id ? { ...parceiro, id } : p));
  };

  const handleDeleteParceiro = (id: string) => {
    setParceiros(prev => prev.filter(p => p.id !== id));
    toast({ title: "Parceiro removido com sucesso!" });
  };

  // Cálculos para visão geral
  const totalReceitas = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Pago').reduce((sum, t) => sum + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const filteredTransacoes = transacoes.filter(transacao =>
    transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transacao.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transacao.cliente && transacao.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestão Financeira Completa</h1>
          <p className="text-gray-400">Controle total das finanças do escritório jurídico</p>
        </div>
      </div>

      {/* Stats Cards de Visão Geral */}
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

      {/* Tabs para diferentes seções */}
      <Tabs defaultValue="contas" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="contas" className="text-gray-300">Contas</TabsTrigger>
          <TabsTrigger value="custos-fixos" className="text-gray-300">Custos Fixos</TabsTrigger>
          <TabsTrigger value="custos-variaveis" className="text-gray-300">Custos Variáveis</TabsTrigger>
          <TabsTrigger value="parceiros" className="text-gray-300">Parceiros</TabsTrigger>
          <TabsTrigger value="metricas" className="text-gray-300">Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="contas" className="space-y-6">
          <ContasManager 
            transacoes={transacoes}
            onAddTransacao={handleAddTransacao}
            onUpdateTransacao={handleUpdateTransacao}
          />
        </TabsContent>

        <TabsContent value="custos-fixos" className="space-y-6">
          <CustosFixosManager 
            custosFixos={custosFixos}
            onAddCusto={handleAddCusto}
            onUpdateCusto={handleUpdateCusto}
            onDeleteCusto={handleDeleteCusto}
          />
        </TabsContent>

        <TabsContent value="custos-variaveis" className="space-y-6">
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">Custos Variáveis</h3>
            <p className="text-gray-400 mb-4">Controle de custas processuais, parceiros e investimentos em marketing</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Custas Processuais</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    R$ {transacoes.filter(t => t.categoria === 'Custas Processuais').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Parceiros</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    R$ {transacoes.filter(t => t.categoria === 'Parceiro Advogado').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Marketing</h4>
                  <p className="text-2xl font-bold text-orange-400">
                    R$ {transacoes.filter(t => t.categoria.includes('Anúncios') || t.categoria.includes('Marketing')).reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Outros</h4>
                  <p className="text-2xl font-bold text-gray-400">
                    R$ {transacoes.filter(t => !['Custas Processuais', 'Parceiro Advogado', 'Anúncios', 'Marketing'].includes(t.categoria) && t.tipo === 'Despesa').reduce((sum, t) => sum + t.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parceiros" className="space-y-6">
          <ParceirosManager 
            parceiros={parceiros}
            onAddParceiro={handleAddParceiro}
            onUpdateParceiro={handleUpdateParceiro}
            onDeleteParceiro={handleDeleteParceiro}
          />
        </TabsContent>

        <TabsContent value="metricas" className="space-y-6">
          <MetricasFinanceiras 
            transacoes={transacoes}
            parceiros={parceiros}
            custosFixos={custosFixos}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;
