
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useCalculators } from '@/hooks/useCalculators';
import CalculatorsHeader from '@/components/calculators/CalculatorsHeader';
import CalculatorsSearch from '@/components/calculators/CalculatorsSearch';
import CalculatorsList from '@/components/calculators/CalculatorsList';
import CalculatorsFooter from '@/components/calculators/CalculatorsFooter';
import CalculatorRenderer from '@/components/calculators/CalculatorRenderer';

const CalculadorasJuridicas = () => {
  const {
    activeCalculator,
    searchTerm,
    filteredCalculators,
    activeCalc,
    setSearchTerm,
    handleCalculatorSelect,
    handleBackToList
  } = useCalculators();

  console.log('Renderizando CalculadorasJuridicas, activeCalculator:', activeCalculator);

  if (activeCalculator) {
    console.log('Calculadora ativa encontrada:', activeCalc);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBackToList}
              className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">{activeCalc?.title || 'Calculadora'}</h1>
              <p className="text-gray-400">{activeCalc?.description || 'Descrição não disponível'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="p-8">
            <CalculatorRenderer calculatorId={activeCalculator} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CalculatorsHeader />
      <CalculatorsSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <CalculatorsList 
        calculators={filteredCalculators}
        onCalculatorSelect={handleCalculatorSelect}
      />
      <CalculatorsFooter />
    </div>
  );
};

export default CalculadorasJuridicas;
