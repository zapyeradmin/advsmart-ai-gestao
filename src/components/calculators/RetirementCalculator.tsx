
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Calendar, DollarSign, Clock } from 'lucide-react';

const RetirementCalculator = () => {
  const [idade, setIdade] = useState('');
  const [tempoContribuicao, setTempoContribuicao] = useState('');
  const [salario, setSalario] = useState('');
  const [sexo, setSexo] = useState('');
  const [result, setResult] = useState<{
    podeAposentar: boolean;
    tipoAposentadoria: string;
    valorEstimado: number;
    pontos: number;
    tempoRestante?: number;
    idadeMinima?: number;
  } | null>(null);

  const calcularAposentadoria = () => {
    const idadeAtual = parseInt(idade);
    const tempoContrib = parseInt(tempoContribuicao);
    const salarioAtual = parseFloat(salario);

    if (!idadeAtual || !tempoContrib || !salarioAtual || !sexo) return;

    const pontos = idadeAtual + tempoContrib;
    const idadeMinimaHomem = 65;
    const idadeMinimaMulher = 62;
    const tempoMinimoHomem = 35;
    const tempoMinimoMulher = 30;
    const pontosMinHomem = 100;
    const pontosMinMulher = 90;

    let podeAposentar = false;
    let tipoAposentadoria = '';
    let tempoRestante = 0;
    let idadeMinima = sexo === 'masculino' ? idadeMinimaHomem : idadeMinimaMulher;

    // Regra por idade
    if ((sexo === 'masculino' && idadeAtual >= idadeMinimaHomem && tempoContrib >= 15) ||
        (sexo === 'feminino' && idadeAtual >= idadeMinimaMulher && tempoContrib >= 15)) {
      podeAposentar = true;
      tipoAposentadoria = 'Aposentadoria por Idade';
    }
    // Regra por pontos (transição)
    else if ((sexo === 'masculino' && pontos >= pontosMinHomem && tempoContrib >= tempoMinimoHomem) ||
             (sexo === 'feminino' && pontos >= pontosMinMulher && tempoContrib >= tempoMinimoMulher)) {
      podeAposentar = true;
      tipoAposentadoria = 'Aposentadoria por Pontos';
    }
    // Calcular tempo restante
    else {
      const tempoRestanteIdade = idadeMinima - idadeAtual;
      const tempoRestanteContrib = (sexo === 'masculino' ? tempoMinimoHomem : tempoMinimoMulher) - tempoContrib;
      tempoRestante = Math.max(tempoRestanteIdade, tempoRestanteContrib);
    }

    // Cálculo simplificado do valor (80% das maiores contribuições)
    const valorEstimado = salarioAtual * 0.8;

    setResult({
      podeAposentar,
      tipoAposentadoria,
      valorEstimado,
      pontos,
      tempoRestante: tempoRestante > 0 ? tempoRestante : undefined,
      idadeMinima
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <UserCheck className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Calculadora de Aposentadoria</h2>
          <p className="text-gray-400 text-sm">Aposentadoria por tempo de contribuição</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar size={20} />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idade" className="text-gray-300">Idade Atual</Label>
                <Input
                  id="idade"
                  type="number"
                  placeholder="Ex: 55"
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
              <Label htmlFor="tempoContribuicao" className="text-gray-300">Tempo de Contribuição (anos)</Label>
              <Input
                id="tempoContribuicao"
                type="number"
                placeholder="Ex: 25"
                value={tempoContribuicao}
                onChange={(e) => setTempoContribuicao(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="salario" className="text-gray-300">Salário Atual (R$)</Label>
              <Input
                id="salario"
                type="number"
                placeholder="Ex: 5000"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button
              onClick={calcularAposentadoria}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!idade || !tempoContribuicao || !salario || !sexo}
            >
              <UserCheck className="mr-2" size={16} />
              Calcular Aposentadoria
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
                    <Clock className="text-yellow-400" size={20} />
                    Ainda não pode se aposentar
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.podeAposentar ? (
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="text-green-400 font-medium text-lg">{result.tipoAposentadoria}</div>
                    <div className="text-green-300 text-sm mt-1">Você já pode se aposentar!</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <DollarSign className="text-green-400 mx-auto mb-1" size={20} />
                      <div className="text-lg font-bold text-white">
                        R$ {result.valorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-400">Valor Estimado</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <UserCheck className="text-blue-400 mx-auto mb-1" size={20} />
                      <div className="text-lg font-bold text-white">{result.pontos}</div>
                      <div className="text-xs text-gray-400">Pontos Atuais</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                    <div className="text-yellow-400 font-medium">Requisitos não atendidos</div>
                    <div className="text-yellow-300 text-sm mt-1">
                      Faltam aproximadamente {result.tempoRestante} anos
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Idade mínima:</span>
                      <span className="text-white">{result.idadeMinima} anos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tempo mínimo:</span>
                      <span className="text-white">{sexo === 'masculino' ? '35' : '30'} anos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pontos atuais:</span>
                      <span className="text-white">{result.pontos}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gray-800/30 border-gray-700/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <Clock size={18} />
            Regras de Aposentadoria (2024)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-gray-300 font-medium mb-2">👨 Homens</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Idade: 65 anos + 15 anos de contribuição</li>
                <li>• Pontos: 100 pontos + 35 anos de contribuição</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-medium mb-2">👩 Mulheres</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Idade: 62 anos + 15 anos de contribuição</li>
                <li>• Pontos: 90 pontos + 30 anos de contribuição</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              ⚠️ Cálculo estimativo. Consulte um especialista para análise detalhada do seu caso.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetirementCalculator;
