
import React from 'react';

interface PersonTypeSelectorProps {
  personType: 'fisica' | 'juridica';
  onPersonTypeChange: (type: 'fisica' | 'juridica') => void;
}

const PersonTypeSelector = ({ personType, onPersonTypeChange }: PersonTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Tipo de Pessoa</h4>
      <div className="flex space-x-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="personType"
            value="fisica"
            checked={personType === 'fisica'}
            onChange={(e) => onPersonTypeChange(e.target.value as 'fisica' | 'juridica')}
            className="mr-2"
          />
          <span className="text-sm text-gray-300">Pessoa Física</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="personType"
            value="juridica"
            checked={personType === 'juridica'}
            onChange={(e) => onPersonTypeChange(e.target.value as 'fisica' | 'juridica')}
            className="mr-2"
          />
          <span className="text-sm text-gray-300">Pessoa Jurídica</span>
        </label>
      </div>
    </div>
  );
};

export default PersonTypeSelector;
