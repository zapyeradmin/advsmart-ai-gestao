
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContasManager from '@/components/financial/ContasManager';
import CustosFixosManager from '@/components/financial/CustosFixosManager';
import ParceirosManager from '@/components/financial/ParceirosManager';
import MetricasFinanceiras from '@/components/financial/MetricasFinanceiras';
import FinancialOverview from '@/components/financial/FinancialOverview';
import CustosVariaveisSection from '@/components/financial/CustosVariaveisSection';
import { useFinancialData } from '@/hooks/useFinancialData';

const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    transacoes,
    custosFixos,
    parceiros,
    handleAddTransacao,
    handleUpdateTransacao,
    handleAddCusto,
    handleUpdateCusto,
    handleDeleteCusto,
    handleAddParceiro,
    handleUpdateParceiro,
    handleDeleteParceiro
  } = useFinancialData();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestão Financeira Completa</h1>
          <p className="text-gray-400">Controle total das finanças do escritório jurídico</p>
        </div>
      </div>

      {/* Stats Cards de Visão Geral */}
      <FinancialOverview transacoes={transacoes} />

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
          <CustosVariaveisSection transacoes={transacoes} />
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
