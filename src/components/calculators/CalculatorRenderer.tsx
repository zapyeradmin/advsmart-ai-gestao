
import React from 'react';
import WorkDaysCalculator from './WorkDaysCalculator';
import InterestCalculator from './InterestCalculator';
import DeadlineCalculator from './DeadlineCalculator';
import LaborCalculator from './LaborCalculator';
import RetirementCalculator from './RetirementCalculator';
import RuralRetirementCalculator from './RuralRetirementCalculator';
import PensionCalculator from './PensionCalculator';

interface CalculatorRendererProps {
  calculatorId: string;
}

const CalculatorRenderer = ({ calculatorId }: CalculatorRendererProps) => {
  console.log('Renderizando calculadora:', calculatorId);

  const renderCalculator = () => {
    try {
      switch (calculatorId) {
        case 'work-days':
          return <WorkDaysCalculator />;
        case 'interest':
          return <InterestCalculator />;
        case 'deadline':
          return <DeadlineCalculator />;
        case 'labor':
          return <LaborCalculator />;
        case 'retirement':
          return <RetirementCalculator />;
        case 'rural-retirement':
          return <RuralRetirementCalculator />;
        case 'pension':
          return <PensionCalculator />;
        case 'alimony':
          return (
            <div className="text-center py-8">
              <div className="text-yellow-400 mb-4">Calculadora em desenvolvimento</div>
              <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
            </div>
          );
        case 'court-fees':
          return (
            <div className="text-center py-8">
              <div className="text-yellow-400 mb-4">Calculadora em desenvolvimento</div>
              <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
            </div>
          );
        default:
          return (
            <div className="text-center py-8">
              <div className="text-red-400 mb-4">Calculadora não encontrada</div>
              <p className="text-gray-500">Verifique se a calculadora está corretamente configurada.</p>
            </div>
          );
      }
    } catch (error) {
      console.error('Erro ao renderizar calculadora:', error);
      return (
        <div className="text-center py-8">
          <div className="text-red-400 mb-4">Erro ao carregar calculadora</div>
          <p className="text-gray-500">Ocorreu um erro ao carregar esta calculadora. Tente novamente.</p>
          <p className="text-xs text-gray-600 mt-2">Erro: {error instanceof Error ? error.message : String(error)}</p>
        </div>
      );
    }
  };

  return renderCalculator();
};

export default CalculatorRenderer;
