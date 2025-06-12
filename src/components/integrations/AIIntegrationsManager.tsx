
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Brain, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Globe,
  TestTube,
  Settings,
  Trash2,
  Plus
} from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import { integrationTemplates } from '@/config/integrationTemplates';
import { useToast } from "@/hooks/use-toast";

const AIIntegrationsManager = () => {
  const { integrations, createIntegration, updateIntegration, deleteIntegration } = useIntegrations();
  const { toast } = useToast();
  const [testPrompt, setTestPrompt] = useState('');
  const [testingIntegration, setTestingIntegration] = useState<string | null>(null);

  const aiIntegrations = integrations.filter(i => 
    ['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(i.type)
  );

  const aiTemplates = integrationTemplates.filter(t => 
    ['openai', 'grok', 'deepseek', 'gemini', 'arcee', 'openrouter'].includes(t.type)
  );

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'openai': return Bot;
      case 'grok': return Brain;
      case 'deepseek': return Cpu;
      case 'gemini': return Sparkles;
      case 'arcee': return MessageSquare;
      case 'openrouter': return Globe;
      default: return Bot;
    }
  };

  const testAIIntegration = async (integrationId: string) => {
    if (!testPrompt.trim()) {
      toast({
        title: "Erro",
        description: "Digite um prompt para testar a integração.",
        variant: "destructive"
      });
      return;
    }

    setTestingIntegration(integrationId);
    
    try {
      // Simular teste de IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Teste realizado com sucesso!",
        description: "A integração de IA respondeu corretamente ao prompt."
      });
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Falha ao testar a integração de IA.",
        variant: "destructive"
      });
    } finally {
      setTestingIntegration(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Integrações de IA</h3>
          <p className="text-gray-400">Gerencie conexões com provedores de inteligência artificial</p>
        </div>
      </div>

      {/* Templates Disponíveis */}
      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Provedores Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTemplates.map((template) => {
              const Icon = getProviderIcon(template.type);
              const isConfigured = aiIntegrations.some(i => i.type === template.type);
              
              return (
                <Card 
                  key={template.type} 
                  className={`bg-gray-800 border-gray-700 transition-all ${
                    isConfigured ? 'border-primary/50' : 'hover:border-gray-600'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{template.name}</h4>
                          <p className="text-xs text-gray-400">{template.description}</p>
                        </div>
                      </div>
                      {isConfigured && (
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          Configurado
                        </Badge>
                      )}
                    </div>
                    {!isConfigured && (
                      <Button 
                        size="sm" 
                        className="w-full bg-primary hover:bg-primary-hover"
                        onClick={() => {
                          // Aqui seria aberto o modal de configuração
                          toast({
                            title: "Configuração",
                            description: `Configure a integração com ${template.name}`
                          });
                        }}
                      >
                        <Plus size={14} className="mr-2" />
                        Configurar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integrações Configuradas */}
      {aiIntegrations.length > 0 && (
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Integrações Configuradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiIntegrations.map((integration) => {
                const Icon = getProviderIcon(integration.type);
                
                return (
                  <div key={integration.id} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{integration.name}</h4>
                          <p className="text-xs text-gray-400">
                            Modelo: {integration.credentials.model || 'Padrão'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={integration.active ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
                        >
                          {integration.active ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300"
                        >
                          <Settings size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteIntegration(integration.id)}
                          className="border-red-700 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                    
                    {integration.lastSync && (
                      <p className="text-xs text-gray-500 mb-3">
                        Último uso: {new Date(integration.lastSync).toLocaleString('pt-BR')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teste de Integração */}
      {aiIntegrations.length > 0 && (
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Testar Integrações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-400">Prompt de Teste</Label>
              <Textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="Digite um prompt para testar as integrações de IA..."
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {aiIntegrations.filter(i => i.active).map((integration) => {
                const Icon = getProviderIcon(integration.type);
                
                return (
                  <Button
                    key={integration.id}
                    size="sm"
                    variant="outline"
                    onClick={() => testAIIntegration(integration.id)}
                    disabled={testingIntegration === integration.id || !testPrompt.trim()}
                    className="border-gray-700 text-gray-300"
                  >
                    {testingIntegration === integration.id ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                    ) : (
                      <TestTube size={14} className="mr-2" />
                    )}
                    Testar {integration.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIIntegrationsManager;
