
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Clock, DollarSign, Scale, Briefcase } from 'lucide-react';
import CalculatorCard from '@/components/calculators/CalculatorCard';
import WorkDaysCalculator from '@/components/calculators/WorkDaysCalculator';
import InterestCalculator from '@/components/calculators/InterestCalculator';
import DeadlineCalculator from '@/components/calculators/DeadlineCalculator';
import LaborCalculator from '@/components/calculators/LaborCalculator';

const CalculadorasJuridicas = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: 'work-days',
      title: 'Cálculo de Dias Úteis',
      description: 'Calcule dias úteis entre datas, considerando feriados',
      icon: Calendar,
      category: 'Prazos'
    },
    {
      id: 'interest',
      title: 'Juros e Correção Monetária',
      description: 'Calcule juros, multas e correção monetária',
      icon: DollarSign,
      category: 'Financeiro'
    },
    {
      id: 'deadline',
      title: 'Calculadora de Prazos',
      description: 'Calcule prazos processuais e recursos',
      icon: Clock,
      category: 'Prazos'
    },
    {
      id: 'labor',
      title: 'Cálculos Trabalhistas',
      description: 'Rescisão, férias, 13º salário e FGTS',
      icon: Briefcase,
      category: 'Trabalhista'
    },
    {
      id: 'pension',
      title: 'Pensão Alimentícia',
      description: 'Calcule valores de pensão alimentícia',
      icon: Scale,
      category: 'Família'
    },
    {
      id: 'court-fees',
      title: 'Custas Judiciais',
      description: 'Calcule custas e taxas judiciais',
      icon: FileText,
      category: 'Custas'
    }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'work-days':
        return <WorkDaysCalculator />;
      case 'interest':
        return <InterestCalculator />;
      case 'deadline':
        return <DeadlineCalculator />;
      case 'labor':
        return <LaborCalculator />;
      default:
        return null;
    }
  };

  const categories = [...new Set(calculators.map(calc => calc.category))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Calculadoras Jurídicas</h1>
          <p className="text-gray-400">Ferramentas especializadas para cálculos jurídicos e automações</p>
        </div>
        {activeCalculator && (
          <Button
            variant="outline"
            onClick={() => setActiveCalculator(null)}
            className="border-gray-700 text-gray-300"
          >
            Voltar às Calculadoras
          </Button>
        )}
      </div>

      {!activeCalculator ? (
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h2 className="text-lg font-medium text-white">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators
                  .filter(calc => calc.category === category)
                  .map((calculator) => (
                    <CalculatorCard
                      key={calculator.id}
                      calculator={calculator}
                      onSelect={() => setActiveCalculator(calculator.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-dark-card rounded-lg border border-gray-800 p-6">
          {renderCalculator()}
        </div>
      )}
    </div>
  );
};

export default CalculadorasJuridicas;
