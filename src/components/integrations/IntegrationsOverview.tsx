
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Webhook, Zap } from 'lucide-react';
import { IntegrationConfig, WebhookConfig } from '@/types/integrations';

interface IntegrationsOverviewProps {
  integrations: IntegrationConfig[];
  webhooks: WebhookConfig[];
}

const IntegrationsOverview = ({ integrations, webhooks }: IntegrationsOverviewProps) => {
  const activeIntegrations = integrations.filter(i => i.active);
  const activeWebhooks = webhooks.filter(w => w.active);

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default IntegrationsOverview;
