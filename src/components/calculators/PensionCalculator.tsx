
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, DollarSign, Calculator } from 'lucide-react';

const PensionCalculator = () => {
  const [valorBeneficio, setValorBeneficio] = useState('');
  const [quantidadeDependentes, setQuantidadeDependentes] = useState('');
  const [tipoDependente, setTipoDependente] = useState('');
  const [tempoContribuicao, setTempoContribuicao] = useState('');
  const [result, setResult] = useState<{
    valorPensao: number;
    valorPorDependente: number;
    percentualTotal: number;
    observacoes: string[];
  } | null>(null);

  const calcularPensao = () => {
    const beneficio = parseFloat(valorBeneficio);
    const dependentes = parseInt(quantidadeDependentes);
    const contribuicao = parseInt(tempoContribuicao);

    if (!beneficio || !dependentes || !tipoDependente || !contribuicao) return;

    let percentualBase = 0.5; // 50% base
    let percentualAdicional = 0;
    let observacoes: string[] = [];

    // Cálculo do percentual adicional por dependente
    if (dependentes === 1) {
      percentualAdicional = 0.1; // 10% para cada dependente
    } else if (dependentes <= 5) {
      percentualAdicional = dependentes * 0.1; // 10% para cada dependente
    } else {
      percentualAdicional = 0.5; // Máximo 50% adicional
      observacoes.push('Máximo de 5 dependentes considerados para cálculo adicional');
    }

    const percentualTotal = percentualBase + percentualAdicional;
    let valorPensao = beneficio * percentualTotal;

    // Verificar valor mínimo
    const salarioMinimo = 1412;
    if (valorPensao < salarioMinimo) {
      valorPensao = salarioMinimo;
      observacoes.push('Valor ajustado para o mínimo de 1 salário mínimo');
    }

    // Regras específicas por tipo de dependente
    if (tipoDependente === 'conjuge') {
      observacoes.push('Cônjuge: direito vitalício se casamento > 2 anos ou filho em comum');
    } else if (tipoDependente === 'filho') {
      observacoes.push('Filhos: direito até 21 anos (ou 24 se universitário) ou invalidez');
    } else if (tipoDependente === 'pais') {
      observacoes.push('Pais: necessária comprovação de dependência econômica');
    }

    // Regras por tempo de contribuição
    if (contribuicao < 18) {
      observacoes.push('⚠️ Menos de 18 meses: pensão por 4 meses apenas');
    } else if (contribuicao < 24) {
      observacoes.push('⚠️ Menos de 2 anos: pensão por período limitado');
    }

    const valorPorDependente = valorPensao / dependentes;

    setResult({
      valorPensao,
      valorPorDependente,
      percentualTotal: percentualTotal * 100,
      observacoes
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-pink-500/20 rounded-lg">
          <Heart className="text-pink-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Calculadora de Pensão por Morte</h2>
          <p className="text-gray-400 text-sm">Calcule o valor da pensão para dependentes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator size={20} />
              Dados do Benefício
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="valorBeneficio" className="text-gray-300">
                Valor do Benefício do Segurado (R$)
              </Label>
              <Input
                id="valorBeneficio"
                type="number"
                placeholder="Ex: 3000"
                value={valorBeneficio}
                onChange={(e) => setValorBeneficio(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Valor da aposentadoria ou salário de benefício
              </p>
            </div>

            <div>
              <Label htmlFor="tempoContribuicao" className="text-gray-300">
                Tempo de Contribuição (meses)
              </Label>
              <Input
                id="tempoContribuicao"
                type="number"
                placeholder="Ex: 120"
                value={tempoContribuicao}
                onChange={(e) => setTempoContribuicao(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantidadeDependentes" className="text-gray-300">
                  Nº de Dependentes
                </Label>
                <Input
                  id="quantidadeDependentes"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Ex: 2"
                  value={quantidadeDependentes}
                  onChange={(e) => setQuantidadeDependentes(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Tipo Principal</Label>
                <Select value={tipoDependente} onValueChange={setTipoDependente}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conjuge">Cônjuge/Companheiro(a)</SelectItem>
                    <SelectItem value="filho">Filho(a)</SelectItem>
                    <SelectItem value="pais">Pais</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={calcularPensao}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              disabled={!valorBeneficio || !quantidadeDependentes || !tipoDependente || !tempoContribuicao}
            >
              <Heart className="mr-2" size={16} />
              Calcular Pensão por Morte
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="text-green-400" size={20} />
                Resultado do Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">Valor Total da Pensão</div>
                  <div className="text-2xl font-bold text-white">
                    R$ {result.valorPensao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {result.percentualTotal.toFixed(0)}% do benefício original
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 text-center">
                  <div className="text-blue-400 text-sm font-medium mb-1">Valor por Dependente</div>
                  <div className="text-xl font-bold text-white">
                    R$ {result.valorPorDependente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Dividido entre {quantidadeDependentes} dependente(s)
                  </div>
                </div>
              </div>

              {result.observacoes.length > 0 && (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                  <div className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                    <Users size={16} />
                    Observações Importantes
                  </div>
                  <ul className="text-yellow-300 text-sm space-y-1">
                    {result.observacoes.map((obs, index) => (
                      <li key={index}>• {obs}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gray-800/30 border-gray-700/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <Heart size={18} />
            Regras da Pensão por Morte
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-gray-300 font-medium mb-2">💰 Cálculo do Valor</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Base: 50% do benefício + 10% por dependente</li>
                <li>• Máximo: 100% do benefício original</li>
                <li>• Mínimo: 1 salário mínimo</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-medium mb-2">👥 Dependentes</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Cônjuge: vitalício (condições aplicáveis)</li>
                <li>• Filhos: até 21 anos ou invalidez</li>
                <li>• Pais: dependência econômica</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              ⚠️ Cálculo estimativo. Regras específicas podem variar conforme cada caso.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PensionCalculator;
