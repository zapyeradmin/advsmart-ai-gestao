
import React from 'react';
import { Calculator } from 'lucide-react';

const CalculatorsHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl flex items-center justify-center">
          <Calculator className="text-primary" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Calculadoras Jurídicas</h1>
          <p className="text-gray-400 text-sm">Ferramentas especializadas para cálculos jurídicos</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsHeader;
