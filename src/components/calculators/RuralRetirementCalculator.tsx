
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tractor, Calendar, UserCheck, AlertCircle } from 'lucide-react';

const RuralRetirementCalculator = () => {
  const [idade, setIdade] = useState('');
  const [tempoRural, setTempoRural] = useState('');
  const [tempoUrbano, setTempoUrbano] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoSegurado, setTipoSegurado] = useState('');
  const [result, setResult] = useState<{
    podeAposentar: boolean;
    tipoAposentadoria: string;
    valorEstimado: number;
    tempoTotal: number;
    requisitosAtendidos: string[];
    faltaAtender: string[];
  } | null>(null);

  const calcularAposentadoriaRural = () => {
    const idadeAtual = parseInt(idade);
    const tempoRuralAnos = parseInt(tempoRural);
    const tempoUrbanoAnos = parseInt(tempoUrbano || '0');

    if (!idadeAtual || !tempoRuralAnos || !sexo || !tipoSegurado) return;

    const tempoTotal = tempoRuralAnos + tempoUrbanoAnos;
    const idadeMinimaHomem = 60;
    const idadeMinimaMulher = 55;
    const carenciaMinima = 15;

    let podeAposentar = false;
    let tipoAposentadoria = '';
    let requisitosAtendidos: string[] = [];
    let faltaAtender: string[] = [];

    const idadeMinima = sexo === 'masculino' ? idadeMinimaHomem : idadeMinimaMulher;

    // Verificar requisitos
    if (idadeAtual >= idadeMinima) {
      requisitosAtendidos.push(`Idade: ${idadeAtual} anos (mínimo ${idadeMinima})`);
    } else {
      faltaAtender.push(`Idade: faltam ${idadeMinima - idadeAtual} anos`);
    }

    if (tempoTotal >= carenciaMinima) {
      requisitosAtendidos.push(`Carência: ${tempoTotal} anos (mínimo ${carenciaMinima})`);
    } else {
      faltaAtender.push(`Carência: faltam ${carenciaMinima - tempoTotal} anos`);
    }

    if (tempoRuralAnos >= carenciaMinima) {
      requisitosAtendidos.push(`Atividade rural: ${tempoRuralAnos} anos comprovados`);
    } else {
      faltaAtender.push(`Atividade rural: faltam ${carenciaMinima - tempoRuralAnos} anos`);
    }

    // Determinar se pode aposentar e tipo
    if (faltaAtender.length === 0) {
      podeAposentar = true;
      if (tipoSegurado === 'especial') {
        tipoAposentadoria = 'Aposentadoria Rural por Idade (Segurado Especial)';
      } else {
        tipoAposentadoria = 'Aposentadoria Rural por Idade';
      }
    }

    // Valor estimado (1 salário mínimo para rural)
    const valorEstimado = 1412; // Salário mínimo 2024

    setResult({
      podeAposentar,
      tipoAposentadoria,
      valorEstimado,
      tempoTotal,
      requisitosAtendidos,
      faltaAtender
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Tractor className="text-green-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Aposentadoria Rural</h2>
          <p className="text-gray-400 text-sm">Calcule sua aposentadoria rural por idade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar size={20} />
              Dados do Trabalhador Rural
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idade" className="text-gray-300">Idade Atual</Label>
                <Input
                  id="idade"
                  type="number"
                  placeholder="Ex: 58"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Sexo</Label>
                <Select value={sexo} onValueChange={setSexo}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Tipo de Segurado</Label>
              <Select value={tipoSegurado} onValueChange={setTipoSegurado}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="especial">Segurado Especial (Agricultor Familiar)</SelectItem>
                  <SelectItem value="contribuinte">Contribuinte Individual Rural</SelectItem>
                  <SelectItem value="empregado">Empregado Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tempoRural" className="text-gray-300">Tempo de Atividade Rural (anos)</Label>
              <Input
                id="tempoRural"
                type="number"
                placeholder="Ex: 20"
                value={tempoRural}
                onChange={(e) => setTempoRural(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="tempoUrbano" className="text-gray-300">Tempo de Atividade Urbana (anos) - Opcional</Label>
              <Input
                id="tempoUrbano"
                type="number"
                placeholder="Ex: 5"
                value={tempoUrbano}
                onChange={(e) => setTempoUrbano(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button
              onClick={calcularAposentadoriaRural}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!idade || !tempoRural || !sexo || !tipoSegurado}
            >
              <Tractor className="mr-2" size={16} />
              Calcular Aposentadoria Rural
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {result.podeAposentar ? (
                  <>
                    <UserCheck className="text-green-400" size={20} />
                    Pode se Aposentar!
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-yellow-400" size={20} />
                    Requisitos Pendentes
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.podeAposentar ? (
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="text-green-400 font-medium text-lg">{result.tipoAposentadoria}</div>
                    <div className="text-green-300 text-sm mt-1">Todos os requisitos foram atendidos!</div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      R$ {result.valorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-400">Valor Estimado (1 Salário Mínimo)</div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                  <div className="text-yellow-400 font-medium mb-2">Requisitos Pendentes:</div>
                  <ul className="text-yellow-300 text-sm space-y-1">
                    {result.faltaAtender.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-white font-medium">Requisitos Verificados:</h4>
                {result.requisitosAtendidos.map((req, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <UserCheck className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-300">{req}</span>
                  </div>
                ))}
                {result.faltaAtender.map((req, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="text-yellow-400 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gray-800/30 border-gray-700/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <Tractor size={18} />
            Requisitos Aposentadoria Rural
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-gray-300 font-medium mb-2">👨 Homens</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Idade mínima: 60 anos</li>
                <li>• Carência: 15 anos de contribuição</li>
                <li>• Comprovação de atividade rural</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-medium mb-2">👩 Mulheres</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Idade mínima: 55 anos</li>
                <li>• Carência: 15 anos de contribuição</li>
                <li>• Comprovação de atividade rural</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              ⚠️ Necessária documentação comprobatória da atividade rural (contratos, declarações, etc.)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RuralRetirementCalculator;
