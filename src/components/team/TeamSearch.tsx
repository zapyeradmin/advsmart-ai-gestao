
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';

interface TeamSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TeamSearch = ({ searchTerm, onSearchChange }: TeamSearchProps) => {
  return (
    <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar membros da equipe..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            Relatório
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamSearch;
