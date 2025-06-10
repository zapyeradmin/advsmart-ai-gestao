
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

const WorkDaysCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateWorkDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    let workDays = 0;
    let currentDate = new Date(start);

    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Não é domingo (0) nem sábado (6)
        workDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult(workDays);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calendar className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-white">Calculadora de Dias Úteis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate" className="text-gray-300">Data Inicial</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="endDate" className="text-gray-300">Data Final</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            onClick={calculateWorkDays}
            className="w-full bg-primary hover:bg-primary-hover text-white"
            disabled={!startDate || !endDate}
          >
            Calcular Dias Úteis
          </Button>
        </div>

        {result !== null && (
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{result}</div>
              <div className="text-gray-300">dias úteis</div>
              <div className="text-sm text-gray-400 mt-4">
                Entre {new Date(startDate).toLocaleDateString('pt-BR')} e {new Date(endDate).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Observações</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Considera apenas dias úteis (segunda a sexta-feira)</li>
          <li>• Não considera feriados nacionais ou estaduais</li>
          <li>• Para cálculos com feriados, consulte calendário oficial</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkDaysCalculator;
