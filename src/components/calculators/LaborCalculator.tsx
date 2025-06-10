
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase } from 'lucide-react';

const LaborCalculator = () => {
  const [salary, setSalary] = useState('');
  const [months, setMonths] = useState('');
  const [calculationType, setCalculationType] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateLabor = () => {
    const salarioBase = parseFloat(salary);
    const meses = parseInt(months);

    if (!salarioBase || !meses || !calculationType) return;

    let calculation = {};

    switch (calculationType) {
      case 'rescisao':
        const avgSalary = salarioBase + (salarioBase * 0.133); // Estimativa com 13º
        calculation = {
          saldoSalario: salarioBase / 30 * 15, // Exemplo: 15 dias
          avisPrevio: salarioBase,
          feriasVencidas: salarioBase * (meses / 12),
          feriasProporcionais: (salarioBase + salarioBase/3) * (meses / 12),
          decimoTerceiro: salarioBase * (meses / 12),
          fgts: avgSalary * meses * 0.08,
          multaFgts: (avgSalary * meses * 0.08) * 0.4
        };
        break;
      
      case 'ferias':
        calculation = {
          feriasSimples: salarioBase,
          tercoConstitucional: salarioBase / 3,
          total: salarioBase + (salarioBase / 3)
        };
        break;
      
      case 'decimoTerceiro':
        calculation = {
          valor: salarioBase * (meses / 12),
          primeira: (salarioBase * (meses / 12)) / 2,
          segunda: (salarioBase * (meses / 12)) / 2
        };
        break;
    }

    setResult(calculation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Briefcase className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-white">Calculadora Trabalhista</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="salary" className="text-gray-300">Salário Base (R$)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="Ex: 3000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="months" className="text-gray-300">Meses Trabalhados</Label>
            <Input
              id="months"
              type="number"
              placeholder="Ex: 12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300">Tipo de Cálculo</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rescisao">Rescisão Contrato</SelectItem>
                <SelectItem value="ferias">Férias</SelectItem>
                <SelectItem value="decimoTerceiro">13º Salário</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateLabor}
            className="w-full bg-primary hover:bg-primary-hover text-white"
            disabled={!salary || !months || !calculationType}
          >
            Calcular
          </Button>
        </div>

        {result && (
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="space-y-4">
              {calculationType === 'rescisao' && (
                <>
                  <div className="border-b border-gray-700 pb-2">
                    <div className="text-lg font-medium text-primary mb-2">Rescisão Contratual</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Saldo de Salário:</span>
                      <span className="text-white">R$ {result.saldoSalario?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Aviso Prévio:</span>
                      <span className="text-white">R$ {result.avisPrevio?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Férias Proporcionais:</span>
                      <span className="text-white">R$ {result.feriasProporcionais?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">13º Proporcional:</span>
                      <span className="text-white">R$ {result.decimoTerceiro?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">FGTS:</span>
                      <span className="text-white">R$ {result.fgts?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Multa FGTS (40%):</span>
                      <span className="text-white">R$ {result.multaFgts?.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-primary">Total Aproximado:</span>
                        <span className="text-primary">
                          R$ {Object.values(result).reduce((sum: number, val: any) => sum + (val || 0), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {calculationType === 'ferias' && (
                <>
                  <div className="border-b border-gray-700 pb-2">
                    <div className="text-lg font-medium text-primary mb-2">Férias</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Férias:</span>
                      <span className="text-white">R$ {result.feriasSimples?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">1/3 Constitucional:</span>
                      <span className="text-white">R$ {result.tercoConstitucional?.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-primary">Total:</span>
                        <span className="text-primary">R$ {result.total?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {calculationType === 'decimoTerceiro' && (
                <>
                  <div className="border-b border-gray-700 pb-2">
                    <div className="text-lg font-medium text-primary mb-2">13º Salário</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">1ª Parcela (nov):</span>
                      <span className="text-white">R$ {result.primeira?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">2ª Parcela (dez):</span>
                      <span className="text-white">R$ {result.segunda?.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-primary">Valor Total:</span>
                        <span className="text-primary">R$ {result.valor?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Disclaimer</h3>
        <div className="text-gray-400 text-sm space-y-1">
          <p>• Os cálculos são estimativas baseadas na legislação atual</p>
          <p>• Valores podem variar conforme convenções coletivas</p>
          <p>• Consulte sempre um contador ou especialista trabalhista</p>
          <p>• Não considera descontos de INSS, IR e outros</p>
        </div>
      </div>
    </div>
  );
};

export default LaborCalculator;
