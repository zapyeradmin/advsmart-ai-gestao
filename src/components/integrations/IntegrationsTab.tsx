
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Trash2, RefreshCw } from 'lucide-react';
import { IntegrationConfig } from '@/types/integrations';

interface IntegrationsTabProps {
  integrations: IntegrationConfig[];
  loading: boolean;
  onEdit: (integrationId: string) => void;
  onDelete: (integrationId: string) => void;
  onSync: (integrationId: string) => void;
}

const IntegrationsTab = ({ 
  integrations, 
  loading, 
  onEdit, 
  onDelete, 
  onSync 
}: IntegrationsTabProps) => {
  return (
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
                  onClick={() => onSync(integration.id)}
                  disabled={loading || !integration.active}
                  className="border-gray-700 text-gray-300"
                >
                  <RefreshCw size={12} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(integration.id)}
                  className="border-gray-700 text-gray-300"
                >
                  <Settings size={12} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(integration.id)}
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
  );
};

export default IntegrationsTab;
