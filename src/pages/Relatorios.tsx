
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Users, FileText, PieChart, LineChart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Relatorios = () => {
  const { toast } = useToast();

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório Financeiro Mensal',
      descricao: 'Receitas, despesas e lucratividade do período',
      tipo: 'Financeiro',
      icone: DollarSign,
      cor: 'text-green-400',
      periodo: 'Janeiro 2024',
      status: 'Disponível'
    },
    {
      id: 2,
      titulo: 'Produtividade da Equipe',
      descricao: 'Análise de performance e casos por advogado',
      tipo: 'Equipe',
      icone: Users,
      cor: 'text-blue-400',
      periodo: 'Janeiro 2024',
      status: 'Disponível'
    },
    {
      id: 3,
      titulo: 'Relatório de Processos',
      descricao: 'Status dos processos e prazos cumpridos',
      tipo: 'Processual',
      icone: FileText,
      cor: 'text-purple-400',
      periodo: 'Janeiro 2024',
      status: 'Disponível'
    },
    {
      id: 4,
      titulo: 'Análise de Clientes',
      descricao: 'Aquisição, retenção e satisfação de clientes',
      tipo: 'Comercial',
      icone: BarChart3,
      cor: 'text-yellow-400',
      periodo: 'Janeiro 2024',
      status: 'Disponível'
    },
    {
      id: 5,
      titulo: 'Dashboard Executivo',
      descricao: 'Visão geral dos KPIs do escritório',
      tipo: 'Executivo',
      icone: PieChart,
      cor: 'text-primary',
      periodo: 'Janeiro 2024',
      status: 'Disponível'
    },
    {
      id: 6,
      titulo: 'Tendências e Projeções',
      descricao: 'Análise preditiva e tendências de negócio',
      tipo: 'Estratégico',
      icone: LineChart,
      cor: 'text-orange-400',
      periodo: 'Janeiro 2024',
      status: 'Em Processamento'
    }
  ];

  const metricas = [
    {
      titulo: 'Receita Total',
      valor: 'R$ 78.450',
      variacao: '+18%',
      tipo: 'positivo',
      icone: DollarSign
    },
    {
      titulo: 'Casos Ativos',
      valor: '89',
      variacao: '+3%',
      tipo: 'positivo',
      icone: FileText
    },
    {
      titulo: 'Taxa de Sucesso',
      valor: '94.2%',
      variacao: '+2.1%',
      tipo: 'positivo',
      icone: TrendingUp
    },
    {
      titulo: 'Satisfação do Cliente',
      valor: '4.8/5',
      variacao: '+0.3',
      tipo: 'positivo',
      icone: Users
    }
  ];

  const handleGerarRelatorio = (tipo: string) => {
    toast({
      title: "Gerando relatório",
      description: `Relatório ${tipo} está sendo processado.`,
    });
  };

  const handleDownload = (titulo: string) => {
    toast({
      title: "Download iniciado",
      description: `${titulo} está sendo baixado.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Relatórios</h1>
          <p className="text-gray-400">Análises detalhadas e insights sobre o desempenho do escritório</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => handleGerarRelatorio('Personalizado')}
        >
          <BarChart3 size={16} className="mr-2" />
          Relatório Personalizado
        </Button>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricas.map((metrica, index) => {
          const Icon = metrica.icone;
          return (
            <Card key={index} className="bg-dark-card border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metrica.titulo}</p>
                    <h3 className="text-2xl font-semibold text-white mt-1">{metrica.valor}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full bg-opacity-30 flex items-center justify-center ${
                    metrica.tipo === 'positivo' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className={`flex items-center text-sm ${
                    metrica.tipo === 'positivo' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <TrendingUp size={12} className="mr-1" />
                    {metrica.variacao}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">vs. mês anterior</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filtros de Período */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar size={20} className="text-gray-400" />
            <span className="text-white font-medium">Período de Análise:</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              Última Semana
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-gray-700">
              Último Mês
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              Último Trimestre
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              Último Ano
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatorios.map((relatorio) => {
          const Icon = relatorio.icone;
          return (
            <Card key={relatorio.id} className="bg-dark-card border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-opacity-20 flex items-center justify-center ${relatorio.cor} bg-current`}>
                    <Icon size={24} className={relatorio.cor} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    relatorio.status === 'Disponível' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {relatorio.status}
                  </span>
                </div>
                <CardTitle className="text-lg text-white mt-3">{relatorio.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{relatorio.descricao}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">Período: {relatorio.periodo}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400`}>
                    {relatorio.tipo}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-gray-700 text-gray-300"
                    onClick={() => handleGerarRelatorio(relatorio.titulo)}
                  >
                    <BarChart3 size={14} className="mr-1" />
                    Visualizar
                  </Button>
                  {relatorio.status === 'Disponível' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700 text-gray-300"
                      onClick={() => handleDownload(relatorio.titulo)}
                    >
                      <Download size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seção de Relatórios Personalizados */}
      <div className="mt-8">
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Criar Relatório Personalizado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Configure relatórios específicos de acordo com suas necessidades de análise.
            </p>
            <div className="flex gap-2">
              <Button 
                className="bg-primary hover:bg-primary-hover text-white"
                onClick={() => handleGerarRelatorio('Personalizado')}
              >
                Começar Configuração
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Ver Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorios;
