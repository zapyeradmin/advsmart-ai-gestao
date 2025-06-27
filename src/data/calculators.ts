
import { Calendar, Clock, DollarSign, Briefcase, UserCheck, Tractor, Heart, Scale, FileText } from 'lucide-react';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  keywords: string[];
}

export const calculators: Calculator[] = [
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

export const categoryColors = {
  'Prazos': 'text-blue-400',
  'Financeiro': 'text-green-400',
  'Trabalhista': 'text-purple-400',
  'Previdenciário': 'text-indigo-400',
  'Família': 'text-pink-400',
  'Custas': 'text-orange-400',
};
