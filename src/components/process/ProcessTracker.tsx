
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Scale, MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProcessMovement {
  codigo: number;
  nome: string;
  dataHora: string;
  complementosTabelados?: Array<{
    codigo: number;
    valor: number;
    nome: string;
    descricao: string;
  }>;
}

interface ProcessData {
  numeroProcesso: string;
  classe: {
    codigo: number;
    nome: string;
  };
  sistema: {
    codigo: number;
    nome: string;
  };
  formato: {
    codigo: number;
    nome: string;
  };
  tribunal: string;
  dataHoraUltimaAtualizacao: string;
  grau: string;
  dataAjuizamento: string;
  movimentos: ProcessMovement[];
  orgaoJulgador: {
    codigoMunicipioIBGE: number;
    codigo: number;
    nome: string;
  };
  assuntos: Array<{
    codigo: number;
    nome: string;
  }>;
  nivelSigilo: number;
}

const ProcessTracker = () => {
  const [numeroProcesso, setNumeroProcesso] = useState('');
  const [processData, setProcessData] = useState<ProcessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchProcess = async () => {
    if (!numeroProcesso.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o número do processo.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessData(null);

    try {
      const response = await fetch('https://api-publica.datajud.cnj.jus.br/api_publica_trf5/_search', {
        method: 'POST',
        headers: {
          'Authorization': 'APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            match: {
              numeroProcesso: numeroProcesso.replace(/\D/g, '') // Remove formatação
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na consulta: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.hits?.hits?.length > 0) {
        setProcessData(data.hits.hits[0]._source);
        toast({
          title: "Processo encontrado!",
          description: "Dados do processo carregados com sucesso.",
        });
      } else {
        setError('Processo não encontrado na base de dados do TRF5.');
        toast({
          title: "Processo não encontrado",
          description: "O número informado não foi localizado na base de dados.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Erro ao consultar processo:', err);
      setError('Erro ao consultar a API. Tente novamente mais tarde.');
      toast({
        title: "Erro na consulta",
        description: "Não foi possível consultar o processo. Verifique sua conexão.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const formatProcessNumber = (number: string) => {
    // Formatar número do processo: 0000000-00.0000.0.00.0000
    const clean = number.replace(/\D/g, '');
    if (clean.length === 20) {
      return `${clean.slice(0, 7)}-${clean.slice(7, 9)}.${clean.slice(9, 13)}.${clean.slice(13, 14)}.${clean.slice(14, 16)}.${clean.slice(16, 20)}`;
    }
    return number;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search size={20} />
            Consultar Processo - TRF5
          </CardTitle>
          <CardDescription className="text-gray-400">
            Consulte processos na Justiça Federal de Pernambuco através da API Datajud-Wiki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Digite o número do processo (ex: 00008323520184013202)"
                value={numeroProcesso}
                onChange={(e) => setNumeroProcesso(e.target.value)}
                className="bg-dark-surface border-dark-border text-white"
                onKeyPress={(e) => e.key === 'Enter' && searchProcess()}
              />
            </div>
            <Button 
              onClick={searchProcess} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Consultando...
                </>
              ) : (
                <>
                  <Search size={16} className="mr-2" />
                  Consultar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {processData && (
        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Informações do Processo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Número do Processo</label>
                  <p className="text-white font-mono text-lg">
                    {formatProcessNumber(processData.numeroProcesso)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Tribunal</label>
                  <p className="text-white">{processData.tribunal}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Classe</label>
                  <p className="text-white">{processData.classe.nome}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Sistema</label>
                  <p className="text-white">{processData.sistema.nome}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Órgão Julgador</label>
                  <p className="text-white">{processData.orgaoJulgador.nome}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Grau</label>
                  <p className="text-white">{processData.grau}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Data de Ajuizamento</label>
                  <p className="text-white flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(processData.dataAjuizamento)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Última Atualização</label>
                  <p className="text-white flex items-center gap-2">
                    <Clock size={16} />
                    {formatDate(processData.dataHoraUltimaAtualizacao)}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Assuntos</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {processData.assuntos.map((assunto, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                      <Scale size={12} className="mr-1" />
                      {assunto.nome}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge 
                  variant={processData.formato.nome === 'Eletrônico' ? 'default' : 'secondary'}
                  className={processData.formato.nome === 'Eletrônico' ? 'bg-green-600' : ''}
                >
                  {processData.formato.nome}
                </Badge>
                <Badge variant="outline" className="text-gray-300">
                  Nível de Sigilo: {processData.nivelSigilo}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Movimentações */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Movimentações Processuais</CardTitle>
              <CardDescription className="text-gray-400">
                {processData.movimentos.length} movimentação(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {processData.movimentos
                  .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
                  .map((movimento, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-white font-medium">{movimento.nome}</h4>
                        <Badge variant="outline" className="text-xs">
                          {movimento.codigo}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(movimento.dataHora)}
                      </p>
                      {movimento.complementosTabelados && movimento.complementosTabelados.length > 0 && (
                        <div className="mt-2">
                          {movimento.complementosTabelados.map((complemento, idx) => (
                            <Badge key={idx} variant="secondary" className="mr-1 mb-1 text-xs">
                              {complemento.nome}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProcessTracker;
