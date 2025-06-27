
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface CalculatorsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CalculatorsSearch = ({ searchTerm, onSearchChange }: CalculatorsSearchProps) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar calculadora..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-600 text-white h-12"
        />
      </div>
    </div>
  );
};

export default CalculatorsSearch;
