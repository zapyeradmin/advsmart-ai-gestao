
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Trash2 } from 'lucide-react';
import { IntegrationConfig } from '@/types/integrations';

interface AIIntegrationCardProps {
  integration: IntegrationConfig;
  onEdit: (integrationId: string) => void;
  onDelete: (integrationId: string) => void;
}

const AIIntegrationCard = ({ integration, onEdit, onDelete }: AIIntegrationCardProps) => {
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
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <span className="text-primary">
              {getProviderIcon(integration.type)}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-white">{integration.name}</h4>
            <p className="text-xs text-gray-400">
              Modelo: {integration.credentials.model || 'Padrão'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={integration.active ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
          >
            {integration.active ? 'Ativo' : 'Inativo'}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(integration.id)}
            className="border-gray-700 text-gray-300"
          >
            <Settings size={12} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(integration.id)}
            className="border-red-700 text-red-400 hover:bg-red-900/20"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>
      
      {integration.lastSync && (
        <p className="text-xs text-gray-500 mb-3">
          Último uso: {new Date(integration.lastSync).toLocaleString('pt-BR')}
        </p>
      )}
    </div>
  );
};

export default AIIntegrationCard;
