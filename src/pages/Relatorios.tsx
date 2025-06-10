
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, Download, FileText, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ReportsOverview from '@/components/reports/ReportsOverview';
import ReportsCharts from '@/components/reports/ReportsCharts';
import ReportsTable from '@/components/reports/ReportsTable';

const Relatorios = () => {
  const { toast } = useToast();

  const dadosOverview = {
    receita: 78450,
    despesas: 45200,
    casosAtivos: 89,
    taxaSucesso: 94.2,
    satisfacaoCliente: 4.8,
    variacao: {
      receita: 18,
      despesas: -5,
      casos: 3,
      sucesso: 2.1,
      satisfacao: 0.3
    }
  };

  const [periodoSelecionado, setPeriodoSelecionado] = useState('ultimo-mes');

  const periodos = [
    { valor: 'ultima-semana', label: 'Última Semana' },
    { valor: 'ultimo-mes', label: 'Último Mês' },
    { valor: 'ultimo-trimestre', label: 'Último Trimestre' },
    { valor: 'ultimo-ano', label: 'Último Ano' }
  ];

  const handleGerarRelatorio = (tipo: string) => {
    toast({
      title: "Gerando relatório",
      description: `Relatório ${tipo} está sendo processado.`,
    });
  };

  const handleExportarDados = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados estão sendo preparados para download.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-dark-text">Relatórios e Analytics</h1>
          <p className="text-dark-text-secondary">Análises detalhadas e insights sobre o desempenho do escritório</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExportarDados}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Exportar Dados
          </Button>
          <Button
            onClick={() => handleGerarRelatorio('Personalizado')}
            className="flex items-center gap-2"
          >
            <BarChart3 size={16} />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Filtros de Período */}
      <Card className="modern-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-dark-text-secondary" />
              <span className="text-dark-text font-medium">Período de Análise:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {periodos.map((periodo) => (
                <Button
                  key={periodo.valor}
                  variant={periodoSelecionado === periodo.valor ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriodoSelecionado(periodo.valor)}
                >
                  {periodo.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview de Métricas */}
      <ReportsOverview data={dadosOverview} />

      {/* Gráficos */}
      <ReportsCharts />

      {/* Tabela de Relatórios */}
      <ReportsTable />

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="modern-card hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="text-primary" size={20} />
              </div>
              <CardTitle className="text-lg text-dark-text">Relatório Automático</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-dark-text-secondary text-sm mb-4">
              Configure relatórios automáticos para serem gerados periodicamente.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleGerarRelatorio('Automático')}
            >
              Configurar
            </Button>
          </CardContent>
        </Card>

        <Card className="modern-card hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <BarChart3 className="text-success" size={20} />
              </div>
              <CardTitle className="text-lg text-dark-text">Dashboard Executivo</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-dark-text-secondary text-sm mb-4">
              Visão estratégica com KPIs essenciais para tomada de decisões.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleGerarRelatorio('Dashboard')}
            >
              Visualizar
            </Button>
          </CardContent>
        </Card>

        <Card className="modern-card hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Settings className="text-warning" size={20} />
              </div>
              <CardTitle className="text-lg text-dark-text">Configurações</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-dark-text-secondary text-sm mb-4">
              Personalize modelos de relatórios e configure notificações.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleGerarRelatorio('Configurações')}
            >
              Acessar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorios;
