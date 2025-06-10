
import React from 'react';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  keywords?: string[];
}

interface CalculatorCardProps {
  calculator: Calculator;
  onSelect: () => void;
}

const CalculatorCard = ({ calculator, onSelect }: CalculatorCardProps) => {
  const Icon = calculator.icon;

  const categoryColors = {
    'Prazos': 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    'Financeiro': 'from-green-500/20 to-green-600/20 border-green-500/30',
    'Trabalhista': 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    'Família': 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    'Custas': 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  };

  const categoryTextColors = {
    'Prazos': 'text-blue-400',
    'Financeiro': 'text-green-400',
    'Trabalhista': 'text-purple-400',
    'Família': 'text-pink-400',
    'Custas': 'text-orange-400',
  };

  return (
    <div className={`
      bg-gradient-to-br ${categoryColors[calculator.category as keyof typeof categoryColors] || 'from-gray-800/50 to-gray-900/50 border-gray-700'}
      rounded-xl border p-6 hover:border-primary/50 transition-all duration-300 
      hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10
      group cursor-pointer
    `}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`
            w-14 h-14 rounded-xl flex items-center justify-center
            bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/20
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className="text-primary" size={28} />
          </div>
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${categoryTextColors[calculator.category as keyof typeof categoryTextColors] || 'text-gray-400'}
            bg-gray-800/50 border border-gray-700
          `}>
            {calculator.category}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
            {calculator.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {calculator.description}
          </p>
        </div>

        {/* Action */}
        <Button
          onClick={onSelect}
          className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary transition-all duration-300"
          variant="outline"
        >
          Abrir Calculadora
        </Button>
      </div>
    </div>
  );
};

export default CalculatorCard;
