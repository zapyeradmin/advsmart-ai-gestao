
import React, { useState, useEffect } from 'react';
import { useIntegrations } from '@/hooks/useIntegrations';
import { integrationTemplates } from '@/config/integrationTemplates';
import { IntegrationType } from '@/types/integrations';
import IntegrationFormDialog from './IntegrationFormDialog';
import IntegrationTypeSelector from './IntegrationTypeSelector';
import IntegrationConfigFields from './IntegrationConfigFields';

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
      setSelectedType(integration.type as IntegrationType);
      setFormData({
        name: integration.name,
        active: integration.active,
        credentials: integration.credentials || {},
        settings: integration.settings || {}
      });
    }
  }, [integration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !template) {
      alert('Selecione um tipo de integração');
      return;
    }

    // Validar campos obrigatórios
    const requiredFields = template.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => 
      !formData.credentials[field.key] || formData.credentials[field.key].toString().trim() === ''
    );

    if (missingFields.length > 0) {
      alert(`Preencha os campos obrigatórios: ${missingFields.map(f => f.label).join(', ')}`);
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

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const handleActiveChange = (active: boolean) => {
    setFormData(prev => ({ ...prev, active }));
  };

  return (
    <IntegrationFormDialog
      isEditing={isEditing}
      selectedType={selectedType}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {!isEditing && (
        <IntegrationTypeSelector
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />
      )}

      {template && (
        <IntegrationConfigFields
          template={template}
          formData={formData}
          onNameChange={handleNameChange}
          onFieldChange={handleFieldChange}
          onActiveChange={handleActiveChange}
        />
      )}
    </IntegrationFormDialog>
  );
};

export default IntegrationForm;
