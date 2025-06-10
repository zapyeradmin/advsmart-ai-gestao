
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
    { name: 'Trabalhista', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Cível', value: 25, color: 'hsl(var(--success))' },
    { name: 'Tributário', value: 20, color: 'hsl(var(--warning))' },
    { name: 'Empresarial', value: 15, color: 'hsl(var(--secondary))' },
    { name: 'Outros', value: 5, color: 'hsl(var(--muted))' }
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
    receitas: { label: "Receitas", color: "hsl(var(--success))" },
    despesas: { label: "Despesas", color: "hsl(var(--destructive))" },
    saldo: { label: "Saldo", color: "hsl(var(--primary))" },
    satisfacao: { label: "Satisfação", color: "hsl(var(--warning))" },
    nps: { label: "NPS", color: "hsl(var(--secondary))" }
  };

  return (
    <div className="space-y-6">
      {/* Receitas vs Despesas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-dark-text">Fluxo de Caixa Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <AreaChart data={receitaDespesas}>
                <defs>
                  <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <YAxis tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="receitas" stroke="hsl(var(--success))" fill="url(#colorReceitas)" />
                <Area type="monotone" dataKey="despesas" stroke="hsl(var(--destructive))" fill="url(#colorDespesas)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-dark-text">Processos por Área Jurídica</CardTitle>
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
                  <ChartTooltip content={<ChartTooltipContent />} />
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
            <CardTitle className="text-dark-text">Performance dos Advogados</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={performanceAdvogados}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="nome" tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <YAxis tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="casos" fill="hsl(var(--primary))" name="Casos" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="text-dark-text">Evolução da Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={clientesSatisfacao}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <YAxis tick={{ fill: 'hsl(var(--dark-text-secondary))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="satisfacao" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={3} 
                  dot={{ fill: 'hsl(var(--warning))' }}
                  name="Satisfação"
                />
                <Line 
                  type="monotone" 
                  dataKey="nps" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3} 
                  dot={{ fill: 'hsl(var(--secondary))' }}
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
