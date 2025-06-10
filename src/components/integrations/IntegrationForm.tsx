
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrations } from '@/hooks/useIntegrations';
import { integrationTemplates } from '@/config/integrationTemplates';
import { IntegrationType } from '@/types/integrations';

interface IntegrationFormProps {
  integrationId?: string;
  onClose: () => void;
  onSave: () => void;
}

const IntegrationForm = ({ integrationId, onClose, onSave }: IntegrationFormProps) => {
  const { integrations, createIntegration, updateIntegration } = useIntegrations();
  
  const [selectedType, setSelectedType] = useState<IntegrationType | ''>('');
  const [formData, setFormData] = useState({
    name: '',
    active: true,
    credentials: {} as Record<string, any>,
    settings: {} as Record<string, any>
  });

  const isEditing = !!integrationId;
  const integration = integrationId ? integrations.find(i => i.id === integrationId) : null;
  const template = selectedType ? integrationTemplates.find(t => t.type === selectedType) : null;

  useEffect(() => {
    if (integration) {
      setSelectedType(integration.type);
      setFormData({
        name: integration.name,
        active: integration.active,
        credentials: integration.credentials,
        settings: integration.settings
      });
    }
  }, [integration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !template) {
      alert('Selecione um tipo de integração');
      return;
    }

    const integrationData = {
      type: selectedType,
      name: formData.name || template.name,
      active: formData.active,
      credentials: formData.credentials,
      settings: formData.settings
    };

    if (isEditing && integrationId) {
      updateIntegration(integrationId, integrationData);
    } else {
      createIntegration(integrationData);
    }

    onSave();
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [key]: value
      }
    }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-dark-card border-gray-800 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? 'Editar Integração' : 'Nova Integração'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEditing && (
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
                    onClick={() => setSelectedType(template.type)}
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
          )}

          {template && (
            <>
              <div>
                <Label htmlFor="name" className="text-gray-400">Nome da Integração</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                        onValueChange={(value) => handleFieldChange(field.key, value)}
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
                          onCheckedChange={(checked) => handleFieldChange(field.key, checked)}
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
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
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
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active" className="text-gray-400">Integração Ativa</Label>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover"
              disabled={!selectedType}
            >
              {isEditing ? 'Atualizar' : 'Criar'} Integração
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationForm;
