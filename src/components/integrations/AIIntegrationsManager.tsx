
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrations } from '@/hooks/useIntegrations';
import { integrationTemplates } from '@/config/integrationTemplates';
import IntegrationForm from './IntegrationForm';
import AIProviderCard from './AIProviderCard';
import AIIntegrationCard from './AIIntegrationCard';
import AITestingPanel from './AITestingPanel';

const AIIntegrationsManager = () => {
  const { integrations, deleteIntegration } = useIntegrations();
  const [showIntegrationForm, setShowIntegrationForm] = useState(false);
  const [selectedIntegrationType, setSelectedIntegrationType] = useState<string>('');
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null);

  const aiIntegrations = integrations.filter(i => 
    ['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)
  );

  const aiTemplates = integrationTemplates.filter(t => 
    ['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(t.type)
  );

  const handleConfigureIntegration = (templateType: string) => {
    setSelectedIntegrationType(templateType);
    setShowIntegrationForm(true);
  };

  const handleEditIntegration = (integrationId: string) => {
    setEditingIntegration(integrationId);
    setShowIntegrationForm(true);
  };

  const handleCloseForm = () => {
    setShowIntegrationForm(false);
    setSelectedIntegrationType('');
    setEditingIntegration(null);
  };

  const handleSaveForm = () => {
    setShowIntegrationForm(false);
    setSelectedIntegrationType('');
    setEditingIntegration(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Integrações de IA</h3>
          <p className="text-gray-400">Gerencie conexões com provedores de inteligência artificial</p>
        </div>
      </div>

      {/* Templates Disponíveis */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Provedores Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTemplates.map((template) => {
              const isConfigured = aiIntegrations.some(i => i.type === template.type);
              
              return (
                <AIProviderCard
                  key={template.type}
                  template={template}
                  isConfigured={isConfigured}
                  onConfigure={handleConfigureIntegration}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integrações Configuradas */}
      {aiIntegrations.length > 0 && (
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Integrações Configuradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiIntegrations.map((integration) => (
                <AIIntegrationCard
                  key={integration.id}
                  integration={integration}
                  onEdit={handleEditIntegration}
                  onDelete={deleteIntegration}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teste de Integração */}
      <AITestingPanel aiIntegrations={aiIntegrations} />

      {/* Modal de Formulário */}
      {showIntegrationForm && (
        <IntegrationForm
          integrationId={editingIntegration || undefined}
          onClose={handleCloseForm}
          onSave={handleSaveForm}
        />
      )}
    </div>
  );
};

export default AIIntegrationsManager;
