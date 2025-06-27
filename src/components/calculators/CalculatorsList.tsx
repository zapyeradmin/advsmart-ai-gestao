
import React from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { Calculator } from '@/data/calculators';
import { categoryColors } from '@/data/calculators';

interface CalculatorsListProps {
  calculators: Calculator[];
  onCalculatorSelect: (id: string) => void;
}

const CalculatorsList = ({ calculators, onCalculatorSelect }: CalculatorsListProps) => {
  const categories = [...new Set(calculators.map(calc => calc.category))];

  if (calculators.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">Nenhuma calculadora encontrada</h3>
        <p className="text-gray-500">Tente ajustar os termos da sua busca</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          {/* Header da categoria */}
          <div className="flex items-center space-x-3 px-2">
            <h2 className={`text-lg font-semibold ${categoryColors[category as keyof typeof categoryColors] || 'text-gray-400'}`}>
              {category}
            </h2>
            <div className="h-px bg-gray-700 flex-1"></div>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
              {calculators.filter(calc => calc.category === category).length}
            </span>
          </div>

          {/* Lista de calculadoras */}
          <div className="space-y-2">
            {calculators
              .filter(calc => calc.category === category)
              .map((calculator) => {
                const Icon = calculator.icon;
                return (
                  <div
                    key={calculator.id}
                    onClick={() => {
                      console.log('Calculadora selecionada:', calculator.id);
                      onCalculatorSelect(calculator.id);
                    }}
                    className="group bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/50 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.01]"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Ícone */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="text-primary" size={20} />
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium group-hover:text-primary transition-colors duration-200">
                          {calculator.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                          {calculator.description}
                        </p>
                      </div>

                      {/* Seta */}
                      <ChevronRight 
                        className="text-gray-500 group-hover:text-primary transition-colors duration-200" 
                        size={20} 
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalculatorsList;
