
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConfiguracoesAparencia = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Preferências de Aparência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Tema</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-primary cursor-pointer">
                <div className="w-full h-16 bg-gray-900 rounded mb-2"></div>
                <p className="text-sm text-center text-white">Escuro</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-gray-700 cursor-pointer">
                <div className="w-full h-16 bg-gray-100 rounded mb-2"></div>
                <p className="text-sm text-center text-gray-400">Claro</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-2 border-gray-700 cursor-pointer">
                <div className="w-full h-16 bg-gradient-to-r from-gray-900 to-gray-100 rounded mb-2"></div>
                <p className="text-sm text-center text-gray-400">Auto</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesAparencia;
