
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useIntegratedData } from '@/hooks/useIntegratedData';

const RevenueChart = () => {
  const { transacoes } = useIntegratedData();

  // Processar dados de transações para o gráfico
  const processChartData = () => {
    const monthlyData: { [key: string]: { receitas: number, despesas: number } } = {};
    
    // Inicializar últimos 6 meses
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const currentDate = new Date();
    
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

    // Converter para array para o gráfico
    return Object.entries(monthlyData).map(([name, data]) => ({
      name,
      receitas: data.receitas,
      despesas: data.despesas
    }));
  };

  const data = processChartData();

  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Receitas x Despesas</h3>
        <div className="flex space-x-2">
          <button className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 py-1 px-3 rounded-button">
            Mensal
          </button>
          <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-button">
            Trimestral
          </button>
          <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-button">
            Anual
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4a9eff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4a9eff" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fc8d62" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fc8d62" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#e0e0e0', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#e0e0e0', fontSize: 12 }}
            tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#111827', 
              border: '1px solid #374151', 
              borderRadius: '8px',
              color: '#e0e0e0'
            }}
            formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
          />
          <Area
            type="monotone"
            dataKey="receitas"
            stroke="#4a9eff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorReceitas)"
            name="Receitas"
          />
          <Area
            type="monotone"
            dataKey="despesas"
            stroke="#fc8d62"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDespesas)"
            name="Despesas"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
