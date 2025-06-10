
import React from 'react';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

interface CalculatorCardProps {
  calculator: Calculator;
  onSelect: () => void;
}

const CalculatorCard = ({ calculator, onSelect }: CalculatorCardProps) => {
  const Icon = calculator.icon;

  return (
    <div className="bg-dark-card rounded-lg border border-gray-800 p-6 hover:border-primary transition-colors">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white mb-2">{calculator.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{calculator.description}</p>
          <Button
            onClick={onSelect}
            className="bg-primary hover:bg-primary-hover text-white w-full"
          >
            Abrir Calculadora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
