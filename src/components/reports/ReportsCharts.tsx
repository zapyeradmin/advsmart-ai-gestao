
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const ReportsCharts = () => {
  const receitaDespesas = [
    { mes: 'Jan', receitas: 78450, despesas: 45200, saldo: 33250 },
    { mes: 'Fev', receitas: 82300, despesas: 48900, saldo: 33400 },
    { mes: 'Mar', receitas: 75600, despesas: 42800, saldo: 32800 },
    { mes: 'Abr', receitas: 89200, despesas: 52100, saldo: 37100 },
    { mes: 'Mai', receitas: 94800, despesas: 55600, saldo: 39200 },
    { mes: 'Jun', receitas: 102300, despesas: 58700, saldo: 43600 }
  ];

  const processosPorArea = [
    { name: 'Trabalhista', value: 35, color: '#6366f1' },
    { name: 'Cível', value: 25, color: '#10b981' },
    { name: 'Tributário', value: 20, color: '#f59e0b' },
    { name: 'Empresarial', value: 15, color: '#8b5cf6' },
    { name: 'Outros', value: 5, color: '#64748b' }
  ];

  const performanceAdvogados = [
    { nome: 'Dr. Silva', casos: 24, sucesso: 95, receita: 45600 },
    { nome: 'Dra. Santos', casos: 18, sucesso: 92, receita: 38200 },
    { nome: 'Dr. Costa', casos: 21, sucesso: 88, receita: 42800 },
    { nome: 'Dra. Lima', casos: 16, sucesso: 94, receita: 35400 },
    { nome: 'Dr. Rocha', casos: 19, sucesso: 90, receita: 39700 }
  ];

  const clientesSatisfacao = [
    { mes: 'Jan', satisfacao: 4.2, nps: 75 },
    { mes: 'Fev', satisfacao: 4.3, nps: 78 },
    { mes: 'Mar', satisfacao: 4.1, nps: 72 },
    { mes: 'Abr', satisfacao: 4.5, nps: 82 },
    { mes: 'Mai', satisfacao: 4.6, nps: 85 },
    { mes: 'Jun', satisfacao: 4.8, nps: 89 }
  ];

  const chartConfig = {
    receitas: { label: "Receitas", color: "#10b981" },
    despesas: { label: "Despesas", color: "#ef4444" },
    saldo: { label: "Saldo", color: "#6366f1" },
    satisfacao: { label: "Satisfação", color: "#f59e0b" },
    nps: { label: "NPS", color: "#8b5cf6" }
  };

  return (
    <div className="space-y-6">
      {/* Receitas vs Despesas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-slate-100 font-semibold">Fluxo de Caixa Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <AreaChart data={receitaDespesas}>
                <defs>
                  <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <YAxis 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="receitas" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorReceitas)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#colorDespesas)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-slate-100 font-semibold">Processos por Área Jurídica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processosPorArea}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {processosPorArea.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569', 
                      borderRadius: '12px',
                      color: '#f1f5f9',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                    }}
                    labelStyle={{ color: '#f1f5f9', fontWeight: '600' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance e Satisfação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-slate-100 font-semibold">Performance dos Advogados</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={performanceAdvogados}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="nome" 
                  tick={{ fill: '#e2e8f0', fontSize: 11 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <YAxis 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="casos" 
                  fill="#6366f1" 
                  name="Casos" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-slate-100 font-semibold">Evolução da Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={clientesSatisfacao}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <YAxis 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: '#4b5563' }}
                  tickLine={{ stroke: '#4b5563' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="satisfacao" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#f59e0b', strokeWidth: 2 }}
                  name="Satisfação"
                />
                <Line 
                  type="monotone" 
                  dataKey="nps" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 2 }}
                  name="NPS"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsCharts;
