
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConfiguracoesSeguranca = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Segurança da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Senha Atual</label>
            <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Nova Senha</label>
            <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Confirmar Nova Senha</label>
            <Input type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div>
              <p className="text-white font-medium">Autenticação em Duas Etapas</p>
              <p className="text-gray-400 text-sm">Adicione uma camada extra de segurança</p>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesSeguranca;
