
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WebhookConfig, IntegrationConfig, IntegrationType, WebhookPayload } from '@/types/integrations';

export const useIntegrations = () => {
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [loading, setLoading] = useState(false);

  // Eventos disponíveis para webhooks
  const availableEvents = [
    'client.created',
    'client.updated',
    'client.deleted',
    'process.created',
    'process.updated',
    'process.status_changed',
    'process.deadline_approaching',
    'financial.transaction_created',
    'financial.payment_received',
    'financial.payment_overdue',
    'team.member_added',
    'document.uploaded',
    'document.shared'
  ];

  // Carregar dados iniciais
  useEffect(() => {
    const savedWebhooks = localStorage.getItem('system_webhooks');
    const savedIntegrations = localStorage.getItem('system_integrations');
    
    if (savedWebhooks) {
      setWebhooks(JSON.parse(savedWebhooks));
    }
    
    if (savedIntegrations) {
      setIntegrations(JSON.parse(savedIntegrations));
    }
  }, []);

  // Salvar no localStorage
  const saveWebhooks = (newWebhooks: WebhookConfig[]) => {
    setWebhooks(newWebhooks);
    localStorage.setItem('system_webhooks', JSON.stringify(newWebhooks));
  };

  const saveIntegrations = (newIntegrations: IntegrationConfig[]) => {
    setIntegrations(newIntegrations);
    localStorage.setItem('system_integrations', JSON.stringify(newIntegrations));
  };

  // Criar webhook
  const createWebhook = (webhookData: Omit<WebhookConfig, 'id' | 'createdAt'>) => {
    const newWebhook: WebhookConfig = {
      ...webhookData,
      id: `webhook-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedWebhooks = [...webhooks, newWebhook];
    saveWebhooks(updatedWebhooks);

    toast({
      title: "Webhook criado com sucesso!",
      description: `Webhook "${newWebhook.name}" foi configurado.`
    });

    return newWebhook;
  };

  // Atualizar webhook
  const updateWebhook = (id: string, updates: Partial<WebhookConfig>) => {
    const updatedWebhooks = webhooks.map(webhook =>
      webhook.id === id ? { ...webhook, ...updates } : webhook
    );
    saveWebhooks(updatedWebhooks);

    toast({
      title: "Webhook atualizado!",
      description: "As configurações foram salvas."
    });
  };

  // Deletar webhook
  const deleteWebhook = (id: string) => {
    const updatedWebhooks = webhooks.filter(webhook => webhook.id !== id);
    saveWebhooks(updatedWebhooks);

    toast({
      title: "Webhook removido!",
      description: "O webhook foi deletado com sucesso."
    });
  };

  // Criar integração
  const createIntegration = (integrationData: Omit<IntegrationConfig, 'id' | 'createdAt'>) => {
    const newIntegration: IntegrationConfig = {
      ...integrationData,
      id: `integration-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedIntegrations = [...integrations, newIntegration];
    saveIntegrations(updatedIntegrations);

    toast({
      title: "Integração configurada!",
      description: `Integração com ${newIntegration.name} foi estabelecida.`
    });

    return newIntegration;
  };

  // Atualizar integração
  const updateIntegration = (id: string, updates: Partial<IntegrationConfig>) => {
    const updatedIntegrations = integrations.map(integration =>
      integration.id === id ? { ...integration, ...updates } : integration
    );
    saveIntegrations(updatedIntegrations);

    toast({
      title: "Integração atualizada!",
      description: "As configurações foram salvas."
    });
  };

  // Deletar integração
  const deleteIntegration = (id: string) => {
    const updatedIntegrations = integrations.filter(integration => integration.id !== id);
    saveIntegrations(updatedIntegrations);

    toast({
      title: "Integração removida!",
      description: "A integração foi desconectada."
    });
  };

  // Disparar webhook
  const triggerWebhook = async (event: string, data: any) => {
    const activeWebhooks = webhooks.filter(webhook => 
      webhook.active && webhook.events.includes(event)
    );

    for (const webhook of activeWebhooks) {
      try {
        const payload: WebhookPayload = {
          event,
          timestamp: new Date().toISOString(),
          data,
          source: 'advsmartai'
        };

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...webhook.headers
        };

        if (webhook.secret) {
          headers['X-Webhook-Secret'] = webhook.secret;
        }

        await fetch(webhook.url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });

        // Atualizar último disparo
        updateWebhook(webhook.id, { 
          lastTriggered: new Date().toISOString() 
        });

        console.log(`Webhook disparado: ${webhook.name} para evento ${event}`);
      } catch (error) {
        console.error(`Erro ao disparar webhook ${webhook.name}:`, error);
      }
    }
  };

  // Testar webhook
  const testWebhook = async (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;

    setLoading(true);
    try {
      await triggerWebhook('test.webhook', { 
        message: 'Este é um teste de webhook',
        webhookId: webhook.id,
        webhookName: webhook.name
      });

      toast({
        title: "Webhook testado!",
        description: "O webhook de teste foi enviado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Falha ao enviar o webhook de teste.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sincronizar integração
  const syncIntegration = async (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration || !integration.active) return;

    setLoading(true);
    try {
      // Simular sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      updateIntegration(integrationId, {
        lastSync: new Date().toISOString()
      });

      toast({
        title: "Sincronização concluída!",
        description: `Dados sincronizados com ${integration.name}.`
      });
    } catch (error) {
      toast({
        title: "Erro na sincronização",
        description: "Falha ao sincronizar com a integração.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    webhooks,
    integrations,
    loading,
    availableEvents,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    triggerWebhook,
    testWebhook,
    syncIntegration
  };
};
