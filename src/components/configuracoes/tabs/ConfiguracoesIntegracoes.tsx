
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Webhook, 
  Settings,
  ExternalLink,
  Bot,
  Brain,
  Zap
} from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import AIIntegrationsManager from '@/components/integrations/AIIntegrationsManager';

const ConfiguracoesIntegracoes = () => {
  const { integrations, webhooks } = useIntegrations();
  
  const activeIntegrations = integrations.filter(i => i.active);
  const activeWebhooks = webhooks.filter(w => w.active);
  const aiIntegrations = integrations.filter(i => 
    ['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-2">Integrações</h3>
        <p className="text-gray-400 text-sm">
          Configure integrações com sistemas externos, IA e webhooks
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="ai">Integrações IA</TabsTrigger>
          <TabsTrigger value="external">Sistemas Externos</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Integrações IA
                </CardTitle>
                <Bot className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{aiIntegrations.length}</div>
                <p className="text-xs text-gray-500">
                  Provedores de IA configurados
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Sistemas Externos
                </CardTitle>
                <Globe className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeIntegrations.length - aiIntegrations.length}</div>
                <p className="text-xs text-gray-500">
                  {integrations.length - aiIntegrations.length} total configuradas
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

          {/* Integrações Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Integrações IA Ativas</CardTitle>
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Bot size={16} className="mr-2" />
                  Gerenciar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiIntegrations.length > 0 ? (
                    aiIntegrations.slice(0, 3).map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                            <Brain size={16} className="text-primary" />
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
                      Nenhuma integração de IA configurada
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Sistemas Externos</CardTitle>
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Globe size={16} className="mr-2" />
                  Gerenciar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeIntegrations.filter(i => !['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)).length > 0 ? (
                    activeIntegrations.filter(i => !['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)).slice(0, 3).map((integration) => (
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
                      Nenhum sistema externo configurado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <AIIntegrationsManager />
        </TabsContent>

        <TabsContent value="external" className="space-y-4">
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

          {/* Sistemas Externos */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Integrações Externas</CardTitle>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Settings size={16} className="mr-2" />
                Gerenciar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeIntegrations.filter(i => !['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)).length > 0 ? (
                  activeIntegrations.filter(i => !['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)).map((integration) => (
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
                    Nenhuma integração externa configurada
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Integrações IA</Label>
                  <p className="text-sm text-gray-500">Habilitar uso de provedores de IA</p>
                </div>
                <Switch defaultChecked />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesIntegracoes;
