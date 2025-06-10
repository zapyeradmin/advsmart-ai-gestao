
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Plus, Settings, Trash2, Eye, Code } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ApiEndpoint } from '@/types/integrations';

const ApiEndpointsManager = () => {
  const { toast } = useToast();
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    {
      id: '1',
      path: '/api/clients',
      method: 'GET',
      description: 'Listar todos os clientes',
      active: true,
      requiresAuth: true,
      rateLimit: 100
    },
    {
      id: '2',
      path: '/api/clients',
      method: 'POST',
      description: 'Criar novo cliente',
      active: true,
      requiresAuth: true,
      rateLimit: 50
    },
    {
      id: '3',
      path: '/api/processes',
      method: 'GET',
      description: 'Listar processos',
      active: true,
      requiresAuth: true,
      rateLimit: 100
    },
    {
      id: '4',
      path: '/api/financial/transactions',
      method: 'GET',
      description: 'Obter transações financeiras',
      active: true,
      requiresAuth: true,
      rateLimit: 200
    },
    {
      id: '5',
      path: '/api/webhooks/trigger',
      method: 'POST',
      description: 'Disparar webhook manualmente',
      active: true,
      requiresAuth: true,
      rateLimit: 10
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<ApiEndpoint | null>(null);
  const [formData, setFormData] = useState({
    path: '',
    method: 'GET' as 'GET' | 'POST' | 'PUT' | 'DELETE',
    description: '',
    active: true,
    requiresAuth: true,
    rateLimit: 100
  });

  const baseUrl = window.location.origin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEndpoint: ApiEndpoint = {
      id: editingEndpoint?.id || `endpoint-${Date.now()}`,
      ...formData
    };

    if (editingEndpoint) {
      setEndpoints(prev => prev.map(ep => ep.id === editingEndpoint.id ? newEndpoint : ep));
      toast({
        title: "Endpoint atualizado!",
        description: "As configurações foram salvas."
      });
    } else {
      setEndpoints(prev => [...prev, newEndpoint]);
      toast({
        title: "Endpoint criado!",
        description: `Novo endpoint ${formData.method} ${formData.path} foi criado.`
      });
    }

    setShowForm(false);
    setEditingEndpoint(null);
    setFormData({
      path: '',
      method: 'GET',
      description: '',
      active: true,
      requiresAuth: true,
      rateLimit: 100
    });
  };

  const handleEdit = (endpoint: ApiEndpoint) => {
    setEditingEndpoint(endpoint);
    setFormData({
      path: endpoint.path,
      method: endpoint.method,
      description: endpoint.description,
      active: endpoint.active,
      requiresAuth: endpoint.requiresAuth,
      rateLimit: endpoint.rateLimit || 100
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEndpoints(prev => prev.filter(ep => ep.id !== id));
    toast({
      title: "Endpoint removido!",
      description: "O endpoint foi deletado com sucesso."
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL copiada para a área de transferência."
    });
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">API Endpoints</h3>
          <p className="text-gray-400">Gerencie os endpoints da API do sistema</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowDocumentation(true)}
            variant="outline"
            className="border-gray-700 text-gray-300"
          >
            <Code size={16} className="mr-2" />
            Documentação
          </Button>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary-hover"
          >
            <Plus size={16} className="mr-2" />
            Novo Endpoint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {endpoints.map((endpoint) => (
          <Card key={endpoint.id} className="bg-dark-card border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge className={getMethodColor(endpoint.method)}>
                    {endpoint.method}
                  </Badge>
                  <div>
                    <p className="font-mono text-white">{endpoint.path}</p>
                    <p className="text-sm text-gray-400">{endpoint.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={endpoint.active ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
                  >
                    {endpoint.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`${baseUrl}${endpoint.path}`)}
                    className="border-gray-700 text-gray-300"
                  >
                    <Copy size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(endpoint)}
                    className="border-gray-700 text-gray-300"
                  >
                    <Settings size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(endpoint.id)}
                    className="border-red-700 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                <span>Auth: {endpoint.requiresAuth ? 'Requerida' : 'Não requerida'}</span>
                <span>Rate Limit: {endpoint.rateLimit}/min</span>
                <span>URL: {baseUrl}{endpoint.path}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulário de Endpoint */}
      {showForm && (
        <Dialog open onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[500px] bg-dark-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingEndpoint ? 'Editar Endpoint' : 'Novo Endpoint'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <Label className="text-gray-400">Método</Label>
                  <Select
                    value={formData.method}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, method: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Label className="text-gray-400">Path</Label>
                  <Input
                    value={formData.path}
                    onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="/api/endpoint"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-400">Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Descrição do endpoint"
                  rows={2}
                />
              </div>

              <div>
                <Label className="text-gray-400">Rate Limit (requisições/minuto)</Label>
                <Input
                  type="number"
                  value={formData.rateLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  min="1"
                  max="1000"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label className="text-gray-400">Endpoint Ativo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.requiresAuth}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requiresAuth: checked }))}
                  />
                  <Label className="text-gray-400">Requer Autenticação</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-gray-700 text-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover"
                >
                  {editingEndpoint ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Documentação */}
      {showDocumentation && (
        <Dialog open onOpenChange={setShowDocumentation}>
          <DialogContent className="sm:max-w-[800px] bg-dark-card border-gray-800 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Documentação da API</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Base URL</h4>
                <code className="bg-gray-800 p-2 rounded text-green-400 block">
                  {baseUrl}
                </code>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Autenticação</h4>
                <p className="text-gray-400 mb-2">
                  Para endpoints que requerem autenticação, inclua o header:
                </p>
                <code className="bg-gray-800 p-2 rounded text-green-400 block">
                  Authorization: Bearer YOUR_API_TOKEN
                </code>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Rate Limiting</h4>
                <p className="text-gray-400">
                  Cada endpoint possui um limite de requisições por minuto. 
                  Quando o limite é atingido, você receberá um status 429.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Endpoints Disponíveis</h4>
                <div className="space-y-3">
                  {endpoints.filter(ep => ep.active).map((endpoint) => (
                    <div key={endpoint.id} className="bg-gray-800 p-3 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-white">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-gray-400">{endpoint.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Rate Limit: {endpoint.rateLimit}/min | 
                        Auth: {endpoint.requiresAuth ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Exemplo de Requisição</h4>
                <pre className="bg-gray-800 p-3 rounded text-green-400 text-sm overflow-x-auto">
{`curl -X GET "${baseUrl}/api/clients" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ApiEndpointsManager;
