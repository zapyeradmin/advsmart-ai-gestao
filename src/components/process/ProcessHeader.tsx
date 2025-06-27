
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface ProcessHeaderProps {
  onNewProcess: () => void;
}

const ProcessHeader = ({ onNewProcess }: ProcessHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Acompanhamento Processual</h1>
        <p className="text-gray-400">Gerencie processos jurídicos com integração completa aos clientes</p>
      </div>
      <Button
        className="bg-primary hover:bg-primary-hover text-white"
        onClick={onNewProcess}
      >
        <Plus size={16} className="mr-2" />
        Novo Processo
      </Button>
    </div>
  );
};

export default ProcessHeader;
