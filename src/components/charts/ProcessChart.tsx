
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useIntegratedData } from '@/hooks/useIntegratedData';

const ProcessChart = () => {
  const { metricas } = useIntegratedData();

  // Cores para as áreas
  const colors = ['#4a9eff', '#8dd3c7', '#fbbf72', '#fc8d62', '#b3b3b3'];

  // Processar dados das áreas jurídicas
  const processChartData = () => {
    const areasData = Object.entries(metricas.processos.porArea).map(([area, quantidade], index) => ({
      name: area,
      value: quantidade,
      color: colors[index % colors.length]
    }));

    // Se não houver dados, mostrar dados de exemplo
    if (areasData.length === 0) {
      return [
        { name: 'Nenhum processo', value: 1, color: '#b3b3b3' }
      ];
    }

    return areas.Data;
  };

  const data = processChartData();

  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Processos por Área</h3>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#111827', 
              border: '1px solid #374151', 
              borderRadius: '8px',
              color: '#e0e0e0'
            }}
            formatter={(value) => [`${value} processos`, '']}
          />
          <Legend 
            verticalAlign="middle" 
            align="right" 
            layout="vertical"
            iconType="circle"
            wrapperStyle={{ color: '#e0e0e0', fontSize: '14px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProcessChart;
