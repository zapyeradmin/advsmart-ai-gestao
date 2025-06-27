import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, FileText, Clock, DollarSign, Scale, Briefcase, Calendar, Search, ArrowLeft, UserCheck, Tractor, Heart, Shield, ChevronRight } from 'lucide-react';
import CalculatorCard from '@/components/calculators/CalculatorCard';
import WorkDaysCalculator from '@/components/calculators/WorkDaysCalculator';
import InterestCalculator from '@/components/calculators/InterestCalculator';
import DeadlineCalculator from '@/components/calculators/DeadlineCalculator';
import LaborCalculator from '@/components/calculators/LaborCalculator';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import RuralRetirementCalculator from '@/components/calculators/RuralRetirementCalculator';
import PensionCalculator from '@/components/calculators/PensionCalculator';

const CalculadorasJuridicas = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Estado atual da calculadora ativa:', activeCalculator);

  const calculators = [
    // Prazos
    {
      id: 'work-days',
      title: 'Cálculo de Dias Úteis',
      description: 'Calcule dias úteis entre datas, considerando feriados e fins de semana',
      icon: Calendar,
      category: 'Prazos',
      keywords: ['dias', 'uteis', 'calendario', 'prazos']
    },
    {
      id: 'deadline',
      title: 'Calculadora de Prazos',
      description: 'Calcule prazos processuais, recursos e manifestações',
      icon: Clock,
      category: 'Prazos',
      keywords: ['prazos', 'processuais', 'recursos', 'manifestacao']
    },
    
    // Financeiro
    {
      id: 'interest',
      title: 'Juros e Correção Monetária',
      description: 'Calcule juros simples, compostos, multas e correção monetária',
      icon: DollarSign,
      category: 'Financeiro',
      keywords: ['juros', 'correcao', 'monetaria', 'financeiro', 'multa']
    },
    
    // Trabalhista
    {
      id: 'labor',
      title: 'Cálculos Trabalhistas',
      description: 'Rescisão, férias, 13º salário, FGTS e demais verbas trabalhistas',
      icon: Briefcase,
      category: 'Trabalhista',
      keywords: ['trabalhista', 'rescisao', 'ferias', 'fgts', 'decimo']
    },
    
    // Previdenciário
    {
      id: 'retirement',
      title: 'Aposentadoria por Tempo',
      description: 'Calcule aposentadoria por tempo de contribuição e regras de transição',
      icon: UserCheck,
      category: 'Previdenciário',
      keywords: ['aposentadoria', 'previdencia', 'inss', 'contribuicao', 'pontos']
    },
    {
      id: 'rural-retirement',
      title: 'Aposentadoria Rural',
      description: 'Calcule aposentadoria rural por idade para trabalhadores rurais',
      icon: Tractor,
      category: 'Previdenciário',
      keywords: ['rural', 'aposentadoria', 'agricultor', 'campo', 'segurado']
    },
    {
      id: 'pension',
      title: 'Pensão por Morte',
      description: 'Calcule valores de pensão por morte para dependentes',
      icon: Heart,
      category: 'Previdenciário',
      keywords: ['pensao', 'morte', 'dependentes', 'conjuge', 'filhos']
    },
    
    // Família
    {
      id: 'alimony',
      title: 'Pensão Alimentícia',
      description: 'Calcule valores de pensão alimentícia e percentuais',
      icon: Scale,
      category: 'Família',
      keywords: ['pensao', 'alimenticia', 'familia', 'percentual']
    },
    
    // Custas
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
    console.log('Função renderCalculator chamada com:', activeCalculator);
    
    if (!activeCalculator) {
      console.log('Nenhuma calculadora ativa, retornando null');
      return null;
    }

    console.log('Tentando renderizar calculadora:', activeCalculator);

    try {
      switch (activeCalculator) {
        case 'work-days':
          console.log('Renderizando WorkDaysCalculator');
          return <WorkDaysCalculator />;
        case 'interest':
          console.log('Renderizando InterestCalculator');
          return <InterestCalculator />;
        case 'deadline':
          console.log('Renderizando DeadlineCalculator');
          return <DeadlineCalculator />;
        case 'labor':
          console.log('Renderizando LaborCalculator');
          return <LaborCalculator />;
        case 'retirement':
          console.log('Renderizando RetirementCalculator');
          return <RetirementCalculator />;
        case 'rural-retirement':
          console.log('Renderizando RuralRetirementCalculator');
          return <RuralRetirementCalculator />;
        case 'pension':
          console.log('Renderizando PensionCalculator');
          return <PensionCalculator />;
        case 'alimony':
          console.log('Renderizando placeholder para pensão alimentícia');
          return (
            <div className="text-center py-8">
              <div className="text-yellow-400 mb-4">Calculadora em desenvolvimento</div>
              <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
            </div>
          );
        case 'court-fees':
          console.log('Renderizando placeholder para custas judiciais');
          return (
            <div className="text-center py-8">
              <div className="text-yellow-400 mb-4">Calculadora em desenvolvimento</div>
              <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
            </div>
          );
        default:
          console.error('Calculadora não reconhecida:', activeCalculator);
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

  const filteredCalculators = calculators.filter(calc => 
    calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(filteredCalculators.map(calc => calc.category))];

  const categoryColors = {
    'Prazos': 'text-blue-400',
    'Financeiro': 'text-green-400',
    'Trabalhista': 'text-purple-400',
    'Previdenciário': 'text-indigo-400',
    'Família': 'text-pink-400',
    'Custas': 'text-orange-400',
  };

  console.log('Renderizando CalculadorasJuridicas, activeCalculator:', activeCalculator);

  if (activeCalculator) {
    const activeCalc = calculators.find(calc => calc.id === activeCalculator);
    console.log('Calculadora ativa encontrada:', activeCalc);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Botão voltar clicado, limpando calculadora ativa');
                setActiveCalculator(null);
              }}
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
            {renderCalculator()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header compacto */}
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

      {/* Busca */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar calculadora..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white h-12"
          />
        </div>
      </div>

      {/* Lista de calculadoras por categoria */}
      <div className="max-w-4xl mx-auto space-y-8">
        {categories.map(category => (
          <div key={category} className="space-y-4">
            {/* Header da categoria */}
            <div className="flex items-center space-x-3 px-2">
              <h2 className={`text-lg font-semibold ${categoryColors[category as keyof typeof categoryColors] || 'text-gray-400'}`}>
                {category}
              </h2>
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                {filteredCalculators.filter(calc => calc.category === category).length}
              </span>
            </div>

            {/* Lista de calculadoras */}
            <div className="space-y-2">
              {filteredCalculators
                .filter(calc => calc.category === category)
                .map((calculator) => {
                  const Icon = calculator.icon;
                  return (
                    <div
                      key={calculator.id}
                      onClick={() => {
                        console.log('Calculadora selecionada:', calculator.id);
                        setActiveCalculator(calculator.id);
                      }}
                      className="group bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/50 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.01]"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Ícone */}
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="text-primary" size={20} />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-primary transition-colors duration-200">
                            {calculator.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                            {calculator.description}
                          </p>
                        </div>

                        {/* Seta */}
                        <ChevronRight 
                          className="text-gray-500 group-hover:text-primary transition-colors duration-200" 
                          size={20} 
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredCalculators.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">Nenhuma calculadora encontrada</h3>
          <p className="text-gray-500">Tente ajustar os termos da sua busca</p>
        </div>
      )}

      {/* Footer compacto */}
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
    </div>
  );
};

export default CalculadorasJuridicas;
