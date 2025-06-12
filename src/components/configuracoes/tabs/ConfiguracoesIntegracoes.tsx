
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Webhook, 
  Settings,
  ExternalLink
} from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';

const ConfiguracoesIntegracoes = () => {
  const { integrations, webhooks } = useIntegrations();
  
  const activeIntegrations = integrations.filter(i => i.active);
  const activeWebhooks = webhooks.filter(w => w.active);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-2">Integrações</h3>
        <p className="text-gray-400 text-sm">
          Configure integrações com sistemas externos e webhooks
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
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

        <Card className="bg-gray-800 border-gray-700">
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
      </div>

      {/* Configurações Gerais */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Habilitar Integrações</Label>
              <p className="text-sm text-gray-500">Permite o uso de integrações externas</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Auto-sincronização</Label>
              <p className="text-sm text-gray-500">Sincronizar automaticamente a cada hora</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Log de Eventos</Label>
              <p className="text-sm text-gray-500">Registrar todas as ações de integração</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Integrações Recentes */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Integrações Configuradas</CardTitle>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Settings size={16} className="mr-2" />
            Gerenciar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeIntegrations.length > 0 ? (
              activeIntegrations.slice(0, 5).map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
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
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                Nenhuma integração configurada
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Webhooks Recentes */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Webhooks Configurados</CardTitle>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Webhook size={16} className="mr-2" />
            Gerenciar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeWebhooks.length > 0 ? (
              activeWebhooks.slice(0, 5).map((webhook) => (
                <div key={webhook.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                      <Webhook size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{webhook.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-48">{webhook.url}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Ativo
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                Nenhum webhook configurado
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Link para página completa */}
      <Card className="bg-primary/10 border-primary/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Gerenciamento Completo</h4>
              <p className="text-sm text-gray-400">
                Acesse a página de integrações para configuração avançada
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover">
              <ExternalLink size={16} className="mr-2" />
              Abrir Integrações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesIntegracoes;
