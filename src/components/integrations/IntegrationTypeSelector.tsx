
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { integrationTemplates } from '@/config/integrationTemplates';
import { IntegrationType } from '@/types/integrations';

interface IntegrationTypeSelectorProps {
  selectedType: IntegrationType | '';
  onTypeSelect: (type: IntegrationType) => void;
}

const IntegrationTypeSelector = ({ selectedType, onTypeSelect }: IntegrationTypeSelectorProps) => {
  return (
    <div>
      <Label className="text-gray-400">Tipo de Integração</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        {integrationTemplates.map((template) => (
          <Card
            key={template.type}
            className={`cursor-pointer transition-all ${
              selectedType === template.type
                ? 'bg-primary/20 border-primary'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => onTypeSelect(template.type as IntegrationType)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">
                    {template.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-400">{template.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationTypeSelector;
