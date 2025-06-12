
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Trash2, TestTube } from 'lucide-react';
import { WebhookConfig } from '@/types/integrations';

interface WebhooksTabProps {
  webhooks: WebhookConfig[];
  loading: boolean;
  onEdit: (webhookId: string) => void;
  onDelete: (webhookId: string) => void;
  onTest: (webhookId: string) => void;
}

const WebhooksTab = ({ 
  webhooks, 
  loading, 
  onEdit, 
  onDelete, 
  onTest 
}: WebhooksTabProps) => {
  return (
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
                    onClick={() => onTest(webhook.id)}
                    disabled={loading || !webhook.active}
                    className="border-gray-700 text-gray-300"
                  >
                    <TestTube size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(webhook.id)}
                    className="border-gray-700 text-gray-300"
                  >
                    <Settings size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(webhook.id)}
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
  );
};

export default WebhooksTab;
