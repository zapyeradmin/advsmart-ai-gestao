
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, FileText, Clock, DollarSign, Scale, Briefcase, Calendar, Search, ArrowLeft } from 'lucide-react';
import CalculatorCard from '@/components/calculators/CalculatorCard';
import WorkDaysCalculator from '@/components/calculators/WorkDaysCalculator';
import InterestCalculator from '@/components/calculators/InterestCalculator';
import DeadlineCalculator from '@/components/calculators/DeadlineCalculator';
import LaborCalculator from '@/components/calculators/LaborCalculator';

const CalculadorasJuridicas = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const calculators = [
    {
      id: 'work-days',
      title: 'Cálculo de Dias Úteis',
      description: 'Calcule dias úteis entre datas, considerando feriados e fins de semana',
      icon: Calendar,
      category: 'Prazos',
      keywords: ['dias', 'uteis', 'calendario', 'prazos']
    },
    {
      id: 'interest',
      title: 'Juros e Correção Monetária',
      description: 'Calcule juros simples, compostos, multas e correção monetária',
      icon: DollarSign,
      category: 'Financeiro',
      keywords: ['juros', 'correcao', 'monetaria', 'financeiro', 'multa']
    },
    {
      id: 'deadline',
      title: 'Calculadora de Prazos',
      description: 'Calcule prazos processuais, recursos e manifestações',
      icon: Clock,
      category: 'Prazos',
      keywords: ['prazos', 'processuais', 'recursos', 'manifestacao']
    },
    {
      id: 'labor',
      title: 'Cálculos Trabalhistas',
      description: 'Rescisão, férias, 13º salário, FGTS e demais verbas trabalhistas',
      icon: Briefcase,
      category: 'Trabalhista',
      keywords: ['trabalhista', 'rescisao', 'ferias', 'fgts', 'decimo']
    },
    {
      id: 'pension',
      title: 'Pensão Alimentícia',
      description: 'Calcule valores de pensão alimentícia e percentuais',
      icon: Scale,
      category: 'Família',
      keywords: ['pensao', 'alimenticia', 'familia', 'percentual']
    },
    {
      id: 'court-fees',
      title: 'Custas Judiciais',
      description: 'Calcule custas processuais, taxas judiciais e emolumentos',
      icon: FileText,
      category: 'Custas',
      keywords: ['custas', 'judiciais', 'taxas', 'emolumentos']
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

  const filteredCalculators = calculators.filter(calc => 
    calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(filteredCalculators.map(calc => calc.category))];

  if (activeCalculator) {
    const activeCalc = calculators.find(calc => calc.id === activeCalculator);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveCalculator(null)}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-white">{activeCalc?.title}</h1>
              <p className="text-gray-400">{activeCalc?.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-card rounded-xl border border-gray-800 p-6 shadow-lg">
          {renderCalculator()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Calculator className="text-primary" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Calculadoras Jurídicas</h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ferramentas especializadas para cálculos jurídicos precisos e automações que facilitam o seu dia a dia
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Buscar calculadora..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{calculators.length}</div>
          <div className="text-sm text-gray-300">Calculadoras Disponíveis</div>
        </div>
        <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-600/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{categories.length}</div>
          <div className="text-sm text-gray-300">Categorias</div>
        </div>
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-600/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">100%</div>
          <div className="text-sm text-gray-300">Precisão</div>
        </div>
      </div>

      {/* Calculators Grid */}
      {filteredCalculators.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">Nenhuma calculadora encontrada</h3>
          <p className="text-gray-500">Tente ajustar os termos da sua busca</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
                <h2 className="text-xl font-semibold text-white px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
                  {category}
                </h2>
                <div className="h-px bg-gradient-to-l from-primary to-transparent flex-1"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators
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
      )}

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 p-6 mt-12">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-medium text-white">💡 Dica Importante</h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Todas as calculadoras são baseadas na legislação vigente e jurisprudência atual. 
            Para casos específicos ou valores de alta complexidade, sempre consulte um especialista.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculadorasJuridicas;
