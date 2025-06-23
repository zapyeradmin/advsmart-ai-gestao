
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar } from 'lucide-react';
import { MetricasFinanceiras as MetricasType, Transacao, Parceiro, CustoFixo } from '@/types/financial';

interface MetricasFinanceirasProps {
  transacoes: Transacao[];
  parceiros: Parceiro[];
  custosFixos: CustoFixo[];
}

const MetricasFinanceiras: React.FC<MetricasFinanceirasProps> = ({
  transacoes,
  parceiros,
  custosFixos
}) => {
  // Calcular métricas
  const receitas = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Pago');
  const despesas = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Pago');
  
  const totalReceitas = receitas.reduce((sum, t) => sum + t.valor, 0);
  const totalDespesas = despesas.reduce((sum, t) => sum + t.valor, 0);
  const totalCustosFixos = custosFixos.filter(c => c.ativo).reduce((sum, c) => sum + c.valor, 0);
  
  const saldoAtual = totalReceitas - totalDespesas;
  const contasAReceber = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Pendente').reduce((sum, t) => sum + t.valor, 0);
  const contasAPagar = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Pendente').reduce((sum, t) => sum + t.valor, 0);
  const saldoProjetado = saldoAtual + contasAReceber - contasAPagar;

  // Dados para gráficos
  const receitasPorMes = receitas.reduce((acc, t) => {
    const mes = new Date(t.data).toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
    acc[mes] = (acc[mes] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const despesasPorMes = despesas.reduce((acc, t) => {
    const mes = new Date(t.data).toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
    acc[mes] = (acc[mes] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const meses = Array.from(new Set([...Object.keys(receitasPorMes), ...Object.keys(despesasPorMes)])).sort();
  
  const dadosFluxoCaixa = meses.map(mes => ({
    mes,
    receitas: receitasPorMes[mes] || 0,
    despesas: despesasPorMes[mes] || 0,
    saldo: (receitasPorMes[mes] || 0) - (despesasPorMes[mes] || 0)
  }));

  const dadosCategoriasDespesas = despesas.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const pieDataDespesas = Object.entries(dadosCategoriasDespesas).map(([categoria, valor]) => ({
    name: categoria,
    value: valor
  }));

  const dadosCategoriasReceitas = receitas.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const pieDataReceitas = Object.entries(dadosCategoriasReceitas).map(([categoria, valor]) => ({
    name: categoria,
    value: valor
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  const chartConfig = {
    receitas: {
      label: "Receitas",
      color: "#10b981",
    },
    despesas: {
      label: "Despesas", 
      color: "#ef4444",
    },
    saldo: {
      label: "Saldo",
      color: "#6366f1",
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Métricas e Indicadores</h3>
        <p className="text-gray-400">Dashboards para análise financeira e tomada de decisões</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Receitas Realizadas</div>
              </div>
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-400">
                  R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Despesas Realizadas</div>
              </div>
              <TrendingDown className="text-red-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Saldo Atual</div>
              </div>
              <DollarSign className={saldoAtual >= 0 ? 'text-green-400' : 'text-red-400'} size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${saldoProjetado >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                  R$ {saldoProjetado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Saldo Projetado</div>
              </div>
              <Target className={saldoProjetado >= 0 ? 'text-blue-400' : 'text-orange-400'} size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Indicadores Operacionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  R$ {totalCustosFixos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Custos Fixos Mensais</div>
              </div>
              <Calendar className="text-orange-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{parceiros.length}</div>
                <div className="text-gray-400 text-sm">Parceiros Ativos</div>
              </div>
              <Users className="text-purple-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {((totalReceitas / (totalReceitas + totalDespesas)) * 100 || 0).toFixed(1)}%
            </div>
            <div className="text-gray-400 text-sm">Margem de Lucratividade</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fluxo de Caixa */}
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Fluxo de Caixa Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={dadosFluxoCaixa}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
                <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Evolução do Saldo */}
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Evolução do Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={dadosFluxoCaixa}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="saldo" stroke="#6366f1" strokeWidth={3} name="Saldo" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição de Receitas */}
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieDataReceitas}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataReceitas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#e0e0e0'
                    }}
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição de Despesas */}
        <Card className="bg-dark-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieDataDespesas}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataDespesas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#e0e0e0'
                    }}
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {receitas.length}
              </div>
              <div className="text-gray-400 text-sm mb-2">Receitas no Período</div>
              <div className="text-xs text-gray-500">
                Média: R$ {receitas.length > 0 ? (totalReceitas / receitas.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {despesas.length}
              </div>
              <div className="text-gray-400 text-sm mb-2">Despesas no Período</div>
              <div className="text-xs text-gray-500">
                Média: R$ {despesas.length > 0 ? (totalDespesas / despesas.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {transacoes.filter(t => t.status === 'Pendente').length}
              </div>
              <div className="text-gray-400 text-sm mb-2">Transações Pendentes</div>
              <div className="text-xs text-gray-500">
                Valor: R$ {(contasAReceber + contasAPagar).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricasFinanceiras;
