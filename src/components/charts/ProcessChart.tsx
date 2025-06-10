
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Trabalhista', value: 35, color: '#4a9eff' },
  { name: 'Cível', value: 25, color: '#8dd3c7' },
  { name: 'Tributário', value: 15, color: '#fbbf72' },
  { name: 'Empresarial', value: 14, color: '#fc8d62' },
  { name: 'Outros', value: 11, color: '#b3b3b3' },
];

const ProcessChart = () => {
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
