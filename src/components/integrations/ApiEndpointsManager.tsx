
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Copy,
  Key,
  Code,
  Globe,
  Shield
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ApiEndpointsManager = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('sk_advsmartai_' + Math.random().toString(36).substr(2, 32));

  const endpoints = [
    {
      path: '/api/clients',
      method: 'GET' as const,
      description: 'Listar todos os clientes',
      example: `{
  "clients": [
    {
      "id": "client_123",
      "name": "João Silva",
      "email": "joao@email.com",
      "status": "Ativo"
    }
  ]
}`
    },
    {
      path: '/api/clients',
      method: 'POST' as const,
      description: 'Criar novo cliente',
      example: `{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 99999-9999",
  "type": "PF"
}`
    },
    {
      path: '/api/processes',
      method: 'GET' as const,
      description: 'Listar processos',
      example: `{
  "processes": [
    {
      "id": "proc_456",
      "number": "1234567-89.2023.8.26.0001",
      "client_id": "client_123",
      "status": "Em Andamento"
    }
  ]
}`
    },
    {
      path: '/api/processes',
      method: 'POST' as const,
      description: 'Criar novo processo',
      example: `{
  "number": "1234567-89.2023.8.26.0001",
  "client_id": "client_123",
  "area": "Cível",
  "subject": "Ação de Cobrança"
}`
    },
    {
      path: '/api/webhooks/trigger',
      method: 'POST' as const,
      description: 'Disparar webhook manualmente',
      example: `{
  "event": "custom.event",
  "data": {
    "message": "Evento customizado",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência."
    });
  };

  const generateNewApiKey = () => {
    const newKey = 'sk_advsmartai_' + Math.random().toString(36).substr(2, 32);
    setApiKey(newKey);
    toast({
      title: "Nova API Key gerada!",
      description: "Certifique-se de salvar a chave em local seguro."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">API Endpoints</h3>
          <p className="text-gray-400">Gerencie endpoints da API e chaves de acesso</p>
        </div>
      </div>

      {/* API Key Management */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Key size={20} className="mr-2" />
            Chave de API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-400">API Key Atual</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                value={apiKey}
                readOnly
                className="bg-gray-800 border-gray-700 text-white font-mono"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(apiKey)}
                className="border-gray-700"
              >
                <Copy size={16} />
              </Button>
              <Button
                size="sm"
                onClick={generateNewApiKey}
                className="bg-primary hover:bg-primary-hover"
              >
                Gerar Nova
              </Button>
            </div>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
            <div className="flex items-center text-yellow-400">
              <Shield size={16} className="mr-2" />
              <span className="font-medium">Importante</span>
            </div>
            <p className="text-yellow-300 text-sm mt-1">
              Mantenha sua API key segura. Ela deve ser incluída no header Authorization: Bearer YOUR_API_KEY
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe size={20} className="mr-2" />
            URL Base da API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              value="https://api.advsmartai.com"
              readOnly
              className="bg-gray-800 border-gray-700 text-white font-mono"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard('https://api.advsmartai.com')}
              className="border-gray-700"
            >
              <Copy size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white flex items-center">
          <Code size={20} className="mr-2" />
          Endpoints Disponíveis
        </h4>
        
        <div className="grid gap-4">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="bg-dark-card border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="outline" 
                      className={`${
                        endpoint.method === 'GET' 
                          ? 'text-green-400 border-green-400' 
                          : 'text-blue-400 border-blue-400'
                      }`}
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-gray-300 font-mono">{endpoint.path}</code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`https://api.advsmartai.com${endpoint.path}`)}
                    className="border-gray-700"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">{endpoint.description}</p>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-gray-400 text-xs">Exemplo de Resposta/Payload</Label>
                  <Textarea
                    value={endpoint.example}
                    readOnly
                    className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-xs mt-1"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Documentação da API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-300 text-sm">
          <div>
            <h5 className="font-medium text-white">Autenticação</h5>
            <p>Todas as requisições devem incluir o header:</p>
            <code className="bg-gray-900 px-2 py-1 rounded text-xs">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          
          <div>
            <h5 className="font-medium text-white">Rate Limiting</h5>
            <p>Limite de 1000 requisições por hora por API key.</p>
          </div>
          
          <div>
            <h5 className="font-medium text-white">Códigos de Resposta</h5>
            <ul className="space-y-1 text-xs">
              <li><code>200</code> - Sucesso</li>
              <li><code>201</code> - Criado com sucesso</li>
              <li><code>400</code> - Dados inválidos</li>
              <li><code>401</code> - Não autorizado</li>
              <li><code>404</code> - Não encontrado</li>
              <li><code>429</code> - Rate limit excedido</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiEndpointsManager;
