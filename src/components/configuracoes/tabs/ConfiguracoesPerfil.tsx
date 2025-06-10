
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConfiguracoesPerfil = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Informações do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Alterar Foto
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
              <Input defaultValue="Dr. Ricardo Oliveira" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">OAB</label>
              <Input defaultValue="SP 123.456" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
              <Input defaultValue="ricardo@advsmartai.com" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Telefone</label>
              <Input defaultValue="(11) 99999-1111" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPerfil;
