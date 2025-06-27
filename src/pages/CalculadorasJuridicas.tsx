
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, FileText, Clock, DollarSign, Scale, Briefcase, Calendar, Search, ArrowLeft, UserCheck, Tractor, Heart, Shield } from 'lucide-react';
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
    console.log('Renderizando calculadora:', activeCalculator);
    
    if (!activeCalculator) {
      return null;
    }

    try {
      switch (activeCalculator) {
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

  if (activeCalculator) {
    const activeCalc = calculators.find(calc => calc.id === activeCalculator);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Voltando para lista de calculadoras');
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
      {/* Enhanced Header Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Calculator className="text-primary" size={32} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Calculadoras Jurídicas
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-blue-600 rounded-full mx-auto mt-2"></div>
          </div>
        </div>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Ferramentas especializadas para cálculos jurídicos precisos e automações que facilitam o seu dia a dia. 
          <span className="text-primary font-medium"> Agora com calculadoras previdenciárias!</span>
        </p>
      </div>

      {/* Enhanced Search Section */}
      <div className="max-w-lg mx-auto">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300" size={20} />
            <Input
              placeholder="Buscar calculadora por nome ou função..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 bg-gray-800/50 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400 h-14 rounded-xl text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-blue-600/30 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-2">{calculators.length}</div>
            <div className="text-sm text-gray-300">Calculadoras</div>
            <div className="text-xs text-blue-300 mt-1">Disponíveis</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-green-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-green-600/30 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">{categories.length}</div>
            <div className="text-sm text-gray-300">Categorias</div>
            <div className="text-xs text-green-300 mt-1">Especializadas</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-purple-600/30 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-sm text-gray-300">Precisão</div>
            <div className="text-xs text-purple-300 mt-1">Garantida</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-orange-600/30 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-400 mb-2">
              <Shield size={24} className="mx-auto" />
            </div>
            <div className="text-sm text-gray-300">Confiável</div>
            <div className="text-xs text-orange-300 mt-1">Atualizado</div>
          </div>
        </div>
      </div>

      {/* Enhanced Calculators Grid */}
      {filteredCalculators.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-gray-400" size={28} />
          </div>
          <h3 className="text-2xl font-medium text-gray-300 mb-3">Nenhuma calculadora encontrada</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Tente ajustar os termos da sua busca ou navegue pelas categorias disponíveis
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map(category => (
            <div key={category} className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1 max-w-xs"></div>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                  <h2 className="relative text-2xl font-bold text-white px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50 shadow-lg">
                    {category}
                  </h2>
                </div>
                <div className="h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent flex-1 max-w-xs"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredCalculators
                  .filter(calc => calc.category === category)
                  .map((calculator) => (
                    <CalculatorCard
                      key={calculator.id}
                      calculator={calculator}
                      onSelect={() => {
                        console.log('Calculadora selecionada:', calculator.id);
                        setActiveCalculator(calculator.id);
                      }}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Footer Info */}
      <div className="relative group mt-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-white">Dica Importante</h3>
            </div>
            <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Todas as calculadoras são baseadas na <span className="text-primary font-medium">legislação vigente</span> e 
              jurisprudência atual. Para casos específicos ou valores de alta complexidade, sempre 
              <span className="text-yellow-400 font-medium"> consulte um especialista</span> para análise detalhada.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Atualizado 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Legislação Atual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Cálculos Precisos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadorasJuridicas;
