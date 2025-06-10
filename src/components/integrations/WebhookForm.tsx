
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useIntegrations } from '@/hooks/useIntegrations';
import { WebhookConfig } from '@/types/integrations';

interface WebhookFormProps {
  webhookId?: string;
  onClose: () => void;
  onSave: () => void;
}

const WebhookForm = ({ webhookId, onClose, onSave }: WebhookFormProps) => {
  const { webhooks, availableEvents, createWebhook, updateWebhook } = useIntegrations();
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: [] as string[],
    active: true,
    secret: '',
    headers: ''
  });

  const isEditing = !!webhookId;
  const webhook = webhookId ? webhooks.find(w => w.id === webhookId) : null;

  useEffect(() => {
    if (webhook) {
      setFormData({
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        active: webhook.active,
        secret: webhook.secret || '',
        headers: webhook.headers ? JSON.stringify(webhook.headers, null, 2) : ''
      });
    }
  }, [webhook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let headers: Record<string, string> = {};
    if (formData.headers.trim()) {
      try {
        headers = JSON.parse(formData.headers);
      } catch (error) {
        alert('Formato JSON inválido nos headers');
        return;
      }
    }

    const webhookData = {
      name: formData.name,
      url: formData.url,
      events: formData.events,
      active: formData.active,
      secret: formData.secret || undefined,
      headers: Object.keys(headers).length > 0 ? headers : undefined
    };

    if (isEditing && webhookId) {
      updateWebhook(webhookId, webhookData);
    } else {
      createWebhook(webhookData);
    }

    onSave();
  };

  const handleEventChange = (event: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        events: [...prev.events, event]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        events: prev.events.filter(e => e !== event)
      }));
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? 'Editar Webhook' : 'Novo Webhook'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-400">Nome do Webhook</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: Webhook Processos"
                required
              />
            </div>

            <div>
              <Label htmlFor="url" className="text-gray-400">URL do Webhook</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://exemplo.com/webhook"
                required
              />
            </div>

            <div>
              <Label htmlFor="secret" className="text-gray-400">Secret (Opcional)</Label>
              <Input
                id="secret"
                type="password"
                value={formData.secret}
                onChange={(e) => setFormData(prev => ({ ...prev, secret: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Token de segurança"
              />
            </div>

            <div>
              <Label className="text-gray-400">Eventos para Monitorar</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {availableEvents.map((event) => (
                  <div key={event} className="flex items-center space-x-2">
                    <Checkbox
                      id={event}
                      checked={formData.events.includes(event)}
                      onCheckedChange={(checked) => handleEventChange(event, checked as boolean)}
                    />
                    <Label htmlFor={event} className="text-sm text-gray-300">
                      {event}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="headers" className="text-gray-400">Headers Customizados (JSON)</Label>
              <Textarea
                id="headers"
                value={formData.headers}
                onChange={(e) => setFormData(prev => ({ ...prev, headers: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active" className="text-gray-400">Webhook Ativo</Label>
            </div>
          </div>

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
            >
              {isEditing ? 'Atualizar' : 'Criar'} Webhook
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookForm;
