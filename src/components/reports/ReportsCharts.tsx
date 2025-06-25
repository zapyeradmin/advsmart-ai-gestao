
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { useIntegratedData } from '@/hooks/useIntegratedData';

const ReportsCharts = () => {
  const { metricas, transacoes, processos } = useIntegratedData();

  // Processar dados de receitas e despesas por mês baseado nas transações reais
  const receitaDespesas = useMemo(() => {
    const monthlyData: { [key: string]: { receitas: number, despesas: number } } = {};
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const currentDate = new Date();
    
    // Inicializar últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = months[date.getMonth()];
      monthlyData[monthKey] = { receitas: 0, despesas: 0 };
    }

    // Agrupar transações por mês
    transacoes.forEach(transacao => {
      if (transacao.status === 'Pago') {
        const transacaoDate = new Date(transacao.data);
        const monthKey = months[transacaoDate.getMonth()];
        
        if (monthlyData[monthKey]) {
          if (transacao.tipo === 'Receita') {
            monthlyData[monthKey].receitas += transacao.valor;
          } else if (transacao.tipo === 'Despesa') {
            monthlyData[monthKey].despesas += transacao.valor;
          }
        }
      }
    });

    return Object.entries(monthlyData).map(([mes, data]) => ({
      mes,
      receitas: data.receitas,
      despesas: data.despesas,
      saldo: data.receitas - data.despesas
    }));
  }, [transacoes]);

  // Processar dados de processos por área baseado nos dados reais
  const processosPorArea = useMemo(() => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];
    
    const areas = Object.entries(metricas.processos.porArea).map(([area, quantidade], index) => ({
      name: area,
      value: quantidade,
      color: colors[index % colors.length]
    }));

    // Se não houver dados, mostrar mensagem
    if (areas.length === 0) {
      return [{ name: 'Nenhum processo', value: 1, color: '#64748b' }];
    }

    return areas;
  }, [metricas.processos.porArea]);

  // Performance dos advogados baseado nos responsáveis dos processos
  const performanceAdvogados = useMemo(() => {
    const advogadosMap: { [key: string]: { casos: number, sucesso: number, receita: number } } = {};
    
    processos.forEach(processo => {
      const responsavel = processo.responsavel || 'Não definido';
      if (!advogadosMap[responsavel]) {
        advogadosMap[responsavel] = { casos: 0, sucesso: 0, receita: 0 };
      }
      
      advogadosMap[responsavel].casos += 1;
      
      if (processo.status === 'Finalizado') {
        advogadosMap[responsavel].sucesso += 1;
      }
      
      if (processo.valorFixo) {
        advogadosMap[responsavel].receita += processo.valorFixo;
      }
    });

    return Object.entries(advogadosMap).map(([nome, data]) => ({
      nome: nome.length > 15 ? nome.substring(0, 15) + '...' : nome,
      casos: data.casos,
      sucesso: data.casos > 0 ? Math.round((data.sucesso / data.casos) * 100) : 0,
      receita: data.receita
    })).slice(0, 5); // Limitar a 5 advogados
  }, [processos]);

  // Evolução da satisfação simulada baseada na performance
  const clientesSatisfacao = useMemo(() => {
    const baseScore = 4.0;
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    
    return months.map((mes, index) => {
      const satisfacao = baseScore + (metricas.processos.taxaSucesso / 100) * 0.8 + (index * 0.05);
      const nps = Math.round(satisfacao * 18 + 10);
      
      return {
        mes,
        satisfacao: Number(satisfacao.toFixed(1)),
        nps: Math.min(nps, 100)
      };
    });
  }, [metricas.processos.taxaSucesso]);

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
