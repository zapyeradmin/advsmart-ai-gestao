
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { IntegrationTemplate } from '@/types/integrations';

interface IntegrationConfigFieldsProps {
  template: IntegrationTemplate;
  formData: {
    name: string;
    active: boolean;
    credentials: Record<string, any>;
    settings: Record<string, any>;
  };
  onNameChange: (name: string) => void;
  onFieldChange: (key: string, value: any) => void;
  onActiveChange: (active: boolean) => void;
}

const IntegrationConfigFields = ({ 
  template, 
  formData, 
  onNameChange, 
  onFieldChange, 
  onActiveChange 
}: IntegrationConfigFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="text-gray-400">Nome da Integração</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder={template.name}
        />
      </div>

      <div className="space-y-4">
        <Label className="text-gray-400">Configurações</Label>
        {template.fields.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="text-sm text-gray-400">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            
            {field.type === 'select' ? (
              <Select
                value={formData.credentials[field.key] || ''}
                onValueChange={(value) => onFieldChange(field.key, value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === 'boolean' ? (
              <div className="flex items-center space-x-2">
                <Switch
                  id={field.key}
                  checked={formData.credentials[field.key] || false}
                  onCheckedChange={(checked) => onFieldChange(field.key, checked)}
                />
                <Label htmlFor={field.key} className="text-sm text-gray-400">
                  {field.placeholder}
                </Label>
              </div>
            ) : (
              <Input
                id={field.key}
                type={field.type}
                value={formData.credentials[field.key] || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={onActiveChange}
        />
        <Label htmlFor="active" className="text-gray-400">Integração Ativa</Label>
      </div>
    </>
  );
};

export default IntegrationConfigFields;
