
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from 'lucide-react';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('');
  const [type, setType] = useState('simple');
  const [result, setResult] = useState<{total: number, interest: number} | null>(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(period);

    if (!p || !r || !t) return;

    let total, interest;

    if (type === 'simple') {
      interest = p * r * t;
      total = p + interest;
    } else {
      total = p * Math.pow(1 + r, t);
      interest = total - p;
    }

    setResult({ total, interest });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <DollarSign className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-white">Calculadora de Juros</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal" className="text-gray-300">Valor Principal (R$)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="Ex: 10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="rate" className="text-gray-300">Taxa de Juros (% ao mês)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              placeholder="Ex: 1.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="period" className="text-gray-300">Período (meses)</Label>
            <Input
              id="period"
              type="number"
              placeholder="Ex: 12"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300">Tipo de Juros</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Juros Simples</SelectItem>
                <SelectItem value="compound">Juros Compostos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateInterest}
            className="w-full bg-primary hover:bg-primary-hover text-white"
            disabled={!principal || !rate || !period}
          >
            Calcular Juros
          </Button>
        </div>

        {result && (
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-300 mb-2">Valor Total</div>
                <div className="text-3xl font-bold text-primary">
                  R$ {result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium text-gray-300 mb-2">Juros</div>
                <div className="text-2xl font-bold text-green-400">
                  R$ {result.interest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-sm text-gray-400 text-center">
                Tipo: {type === 'simple' ? 'Juros Simples' : 'Juros Compostos'}
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Fórmulas Utilizadas</h3>
        <div className="text-gray-400 text-sm space-y-2">
          <div><strong>Juros Simples:</strong> J = C × i × t</div>
          <div><strong>Juros Compostos:</strong> M = C × (1 + i)^t</div>
          <div className="text-xs mt-2">
            Onde: C = Capital, i = Taxa, t = Tempo, J = Juros, M = Montante
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
