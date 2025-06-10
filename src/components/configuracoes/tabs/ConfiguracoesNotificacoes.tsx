
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConfiguracoesNotificacoes = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Preferências de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Notificações por E-mail</p>
                <p className="text-gray-400 text-sm">Receber atualizações importantes por e-mail</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Lembretes de Prazos</p>
                <p className="text-gray-400 text-sm">Alertas sobre prazos próximos do vencimento</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Notificações de Pagamento</p>
                <p className="text-gray-400 text-sm">Alertas sobre pagamentos recebidos</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesNotificacoes;
