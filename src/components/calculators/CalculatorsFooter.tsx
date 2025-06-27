
import React from 'react';
import { Shield } from 'lucide-react';

const CalculatorsFooter = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700/30 p-6 mt-12">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-yellow-400">
          <Shield size={16} />
          <span className="text-sm font-medium">Calculadoras Atualizadas 2024</span>
        </div>
        <p className="text-gray-400 text-xs max-w-2xl mx-auto">
          Baseadas na legislação vigente. Para casos específicos, consulte um especialista.
        </p>
      </div>
    </div>
  );
};

export default CalculatorsFooter;
