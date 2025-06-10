
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Settings, 
  Trash2, 
  TestTube, 
  RefreshCw,
  Globe,
  Webhook,
  Zap
} from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import WebhookForm from './WebhookForm';
import IntegrationForm from './IntegrationForm';
import ApiEndpointsManager from './ApiEndpointsManager';

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

  const activeIntegrations = integrations.filter(i => i.active);
  const activeWebhooks = webhooks.filter(w => w.active);

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

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Integrações Ativas
                </CardTitle>
                <Globe className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeIntegrations.length}</div>
                <p className="text-xs text-gray-500">
                  {integrations.length} total configuradas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Webhooks Ativos
                </CardTitle>
                <Webhook className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeWebhooks.length}</div>
                <p className="text-xs text-gray-500">
                  {webhooks.length} total configurados
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Eventos Disponíveis
                </CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">13</div>
                <p className="text-xs text-gray-500">
                  Tipos de eventos do sistema
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Integrações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeIntegrations.slice(0, 5).map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                          <Globe size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{integration.name}</p>
                          <p className="text-xs text-gray-400">{integration.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Ativo
                      </Badge>
                    </div>
                  ))}
                  {activeIntegrations.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      Nenhuma integração ativa
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Webhooks Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeWebhooks.slice(0, 5).map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                          <Webhook size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{webhook.name}</p>
                          <p className="text-xs text-gray-400">
                            {webhook.events.length} evento(s)
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Ativo
                      </Badge>
                    </div>
                  ))}
                  {activeWebhooks.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      Nenhum webhook ativo
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-dark-card border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-white">
                      {integration.name}
                    </CardTitle>
                    <p className="text-xs text-gray-400">{integration.type}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={integration.active ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
                  >
                    {integration.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Criado em {new Date(integration.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => syncIntegration(integration.id)}
                        disabled={loading || !integration.active}
                        className="border-gray-700 text-gray-300"
                      >
                        <RefreshCw size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingIntegration(integration.id)}
                        className="border-gray-700 text-gray-300"
                      >
                        <Settings size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteIntegration(integration.id)}
                        className="border-red-700 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id} className="bg-dark-card border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-white">
                      {webhook.name}
                    </CardTitle>
                    <p className="text-xs text-gray-400 truncate">{webhook.url}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={webhook.active ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
                  >
                    {webhook.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      {webhook.events.length} evento(s) configurado(s)
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {webhook.lastTriggered ? 
                          `Último: ${new Date(webhook.lastTriggered).toLocaleDateString('pt-BR')}` :
                          'Nunca disparado'
                        }
                      </p>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testWebhook(webhook.id)}
                          disabled={loading || !webhook.active}
                          className="border-gray-700 text-gray-300"
                        >
                          <TestTube size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingWebhook(webhook.id)}
                          className="border-gray-700 text-gray-300"
                        >
                          <Settings size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteWebhook(webhook.id)}
                          className="border-red-700 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
