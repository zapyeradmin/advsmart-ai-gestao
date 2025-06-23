
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { IntegrationTemplate } from '@/types/integrations';

interface AIProviderCardProps {
  template: IntegrationTemplate;
  isConfigured: boolean;
  onConfigure: (templateType: string) => void;
}

const AIProviderCard = ({ template, isConfigured, onConfigure }: AIProviderCardProps) => {
  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'openai': return '🤖';
      case 'grok': return '🧠';
      case 'deepseek': return '💻';
      case 'gemini': return '✨';
      case 'arcee': return '💬';
      case 'openrouter': return '🌐';
      default: return '🤖';
    }
  };

  return (
    <Card 
      className={`bg-gray-800 border-gray-700 transition-all ${
        isConfigured ? 'border-primary/50' : 'hover:border-gray-600'
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-lg">
                {getProviderIcon(template.type)}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-white">{template.name}</h4>
              <p className="text-xs text-gray-400">{template.description}</p>
            </div>
          </div>
          {isConfigured && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              Configurado
            </Badge>
          )}
        </div>
        {!isConfigured && (
          <Button 
            size="sm" 
            className="w-full bg-primary hover:bg-primary-hover"
            onClick={() => onConfigure(template.type)}
          >
            <Plus size={14} className="mr-2" />
            Configurar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProviderCard;
