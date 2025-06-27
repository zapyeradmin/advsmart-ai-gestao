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

  console.log('CalculatorCard renderizado para:', calculator.id);

  const categoryColors = {
    'Prazos': {
      gradient: 'from-blue-500/20 via-blue-600/20 to-blue-700/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20'
    },
    'Financeiro': {
      gradient: 'from-green-500/20 via-green-600/20 to-green-700/20',
      border: 'border-green-500/30',
      text: 'text-green-400',
      glow: 'shadow-green-500/20'
    },
    'Trabalhista': {
      gradient: 'from-purple-500/20 via-purple-600/20 to-purple-700/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20'
    },
    'Previdenciário': {
      gradient: 'from-indigo-500/20 via-indigo-600/20 to-indigo-700/20',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-500/20'
    },
    'Família': {
      gradient: 'from-pink-500/20 via-pink-600/20 to-pink-700/20',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20'
    },
    'Custas': {
      gradient: 'from-orange-500/20 via-orange-600/20 to-orange-700/20',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      glow: 'shadow-orange-500/20'
    },
  };

  const colors = categoryColors[calculator.category as keyof typeof categoryColors] || {
    gradient: 'from-gray-700/20 via-gray-800/20 to-gray-900/20',
    border: 'border-gray-600/30',
    text: 'text-gray-400',
    glow: 'shadow-gray-500/20'
  };

  const handleCardClick = () => {
    console.log('Card clicado para calculadora:', calculator.id);
    onSelect();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Botão clicado para calculadora:', calculator.id);
    onSelect();
  };

  return (
    <div className="group relative" onClick={handleCardClick}>
      {/* Hover glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm ${colors.glow}`}></div>
      
      {/* Main card */}
      <div className={`
        relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border ${colors.border} p-6 
        hover:transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300
        cursor-pointer h-full flex flex-col
      `}>
        
        {/* Decorative corner elements */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={`
              relative w-16 h-16 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 
              border border-primary/20 shadow-lg
              group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
            `}>
              <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={28} />
              
              {/* Icon glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            </div>
            
            <div className={`
              text-xs font-medium px-3 py-1.5 rounded-full
              bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm
              ${colors.text} group-hover:bg-gray-600/50 transition-all duration-300
            `}>
              {calculator.category}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
              {calculator.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {calculator.description}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <Button
            onClick={handleButtonClick}
            className={`
              w-full bg-primary/10 hover:bg-primary text-primary hover:text-white 
              border border-primary/30 hover:border-primary 
              transition-all duration-300 group-hover:shadow-lg
              font-medium h-11 rounded-xl
            `}
            variant="outline"
          >
            <span className="group-hover:scale-105 transition-transform duration-200">
              Abrir Calculadora
            </span>
          </Button>
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-primary/60 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
