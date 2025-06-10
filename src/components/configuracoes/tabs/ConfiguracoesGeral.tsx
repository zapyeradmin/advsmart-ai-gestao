
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ConfiguracoesGeral = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Informações do Escritório</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nome do Escritório</label>
              <Input defaultValue="AdvSmart AI" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">CNPJ</label>
              <Input defaultValue="12.345.678/0001-90" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Telefone</label>
              <Input defaultValue="(11) 3333-4444" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
              <Input defaultValue="contato@advsmartai.com" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Endereço</label>
            <Textarea 
              defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesGeral;
