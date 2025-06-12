
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Webhook } from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import WebhookForm from './WebhookForm';
import IntegrationForm from './IntegrationForm';
import ApiEndpointsManager from './ApiEndpointsManager';
import IntegrationsOverview from './IntegrationsOverview';
import IntegrationsTab from './IntegrationsTab';
import WebhooksTab from './WebhooksTab';

const IntegrationsManager = () => {
  const {
    webhooks,
    integrations,
    loading,
    deleteWebhook,
    deleteIntegration,
    testWebhook,
    syncIntegration
  } = useIntegrations();

  const [showWebhookForm, setShowWebhookForm] = useState(false);
  const [showIntegrationForm, setShowIntegrationForm] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<string | null>(null);
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white">Integrações e Webhooks</h2>
          <p className="text-gray-400">Gerencie integrações externas e webhooks do sistema</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowWebhookForm(true)}
            className="bg-primary hover:bg-primary-hover"
          >
            <Webhook size={16} className="mr-2" />
            Novo Webhook
          </Button>
          <Button
            onClick={() => setShowIntegrationForm(true)}
            variant="outline"
            className="border-gray-700 text-gray-300"
          >
            <Plus size={16} className="mr-2" />
            Nova Integração
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <IntegrationsOverview integrations={integrations} webhooks={webhooks} />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsTab
            integrations={integrations}
            loading={loading}
            onEdit={setEditingIntegration}
            onDelete={deleteIntegration}
            onSync={syncIntegration}
          />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhooksTab
            webhooks={webhooks}
            loading={loading}
            onEdit={setEditingWebhook}
            onDelete={deleteWebhook}
            onTest={testWebhook}
          />
        </TabsContent>

        <TabsContent value="api">
          <ApiEndpointsManager />
        </TabsContent>
      </Tabs>

      {showWebhookForm && (
        <WebhookForm
          onClose={() => setShowWebhookForm(false)}
          onSave={() => setShowWebhookForm(false)}
        />
      )}

      {showIntegrationForm && (
        <IntegrationForm
          onClose={() => setShowIntegrationForm(false)}
          onSave={() => setShowIntegrationForm(false)}
        />
      )}

      {editingWebhook && (
        <WebhookForm
          webhookId={editingWebhook}
          onClose={() => setEditingWebhook(null)}
          onSave={() => setEditingWebhook(null)}
        />
      )}

      {editingIntegration && (
        <IntegrationForm
          integrationId={editingIntegration}
          onClose={() => setEditingIntegration(null)}
          onSave={() => setEditingIntegration(null)}
        />
      )}
    </div>
  );
};

export default IntegrationsManager;
