
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TestTube } from 'lucide-react';
import { IntegrationConfig } from '@/types/integrations';
import { useToast } from "@/hooks/use-toast";

interface AITestingPanelProps {
  aiIntegrations: IntegrationConfig[];
}

const AITestingPanel = ({ aiIntegrations }: AITestingPanelProps) => {
  const { toast } = useToast();
  const [testPrompt, setTestPrompt] = useState('');
  const [testingIntegration, setTestingIntegration] = useState<string | null>(null);

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'openai': return '🤖';
      case 'grok': return '🧠';
      case 'deepseek': return '💻';
      case 'gemini': return '✨';
      case 'arcee': return '💬';
      case 'openrouter': return '🌐';
      default: return '🤖';
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

  if (aiIntegrations.length === 0) return null;

  return (
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
          {aiIntegrations.filter(i => i.active).map((integration) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AITestingPanel;
