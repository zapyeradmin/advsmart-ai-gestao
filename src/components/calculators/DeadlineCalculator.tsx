
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from 'lucide-react';

const DeadlineCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [prazoType, setPrazoType] = useState('');
  const [result, setResult] = useState<Date | null>(null);

  const prazos = {
    'contestacao': { days: 15, name: 'Contestação' },
    'recurso-apelacao': { days: 15, name: 'Recurso de Apelação' },
    'recurso-especial': { days: 15, name: 'Recurso Especial' },
    'recurso-extraordinario': { days: 15, name: 'Recurso Extraordinário' },
    'embargos-declaracao': { days: 5, name: 'Embargos de Declaração' },
    'impugnacao-cumprimento': { days: 15, name: 'Impugnação ao Cumprimento' },
    'manifestacao-15': { days: 15, name: 'Manifestação (15 dias)' },
    'manifestacao-5': { days: 5, name: 'Manifestação (5 dias)' }
  };

  const calculateDeadline = () => {
    if (!startDate || !prazoType) return;

    const start = new Date(startDate);
    const prazo = prazos[prazoType as keyof typeof prazos];
    let deadline = new Date(start);
    let daysAdded = 0;

    while (daysAdded < prazo.days) {
      deadline.setDate(deadline.getDate() + 1);
      const dayOfWeek = deadline.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Não é domingo nem sábado
        daysAdded++;
      }
    }

    setResult(deadline);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Clock className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-white">Calculadora de Prazos Processuais</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate" className="text-gray-300">Data de Intimação/Citação</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300">Tipo de Prazo</Label>
            <Select value={prazoType} onValueChange={setPrazoType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Selecione o tipo de prazo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(prazos).map(([key, prazo]) => (
                  <SelectItem key={key} value={key}>
                    {prazo.name} ({prazo.days} dias)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateDeadline}
            className="w-full bg-primary hover:bg-primary-hover text-white"
            disabled={!startDate || !prazoType}
          >
            Calcular Prazo
          </Button>
        </div>

        {result && (
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-lg font-medium text-gray-300 mb-2">Prazo Final</div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {result.toLocaleDateString('pt-BR', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                {prazoType && prazos[prazoType as keyof typeof prazos].name}
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-medium">⚠️ Atenção</div>
                <div className="text-yellow-300 text-xs mt-1">
                  Verifique feriados e suspensões dos prazos processuais
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Observações Importantes</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Prazos calculados em dias úteis (exceto quando especificado)</li>
          <li>• Não considera feriados nacionais, estaduais ou municipais</li>
          <li>• Verifique o CPC e legislação específica aplicável</li>
          <li>• Consulte sempre o calendário oficial do tribunal</li>
        </ul>
      </div>
    </div>
  );
};

export default DeadlineCalculator;
