
import { useState, useMemo } from 'react';
import { calculators } from '@/data/calculators';

export const useCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calc => 
      calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleCalculatorSelect = (id: string) => {
    console.log('Calculadora selecionada:', id);
    setActiveCalculator(id);
  };

  const handleBackToList = () => {
    console.log('Voltando para lista de calculadoras');
    setActiveCalculator(null);
  };

  const activeCalc = activeCalculator 
    ? calculators.find(calc => calc.id === activeCalculator)
    : null;

  return {
    activeCalculator,
    searchTerm,
    filteredCalculators,
    activeCalc,
    setSearchTerm,
    handleCalculatorSelect,
    handleBackToList
  };
};
