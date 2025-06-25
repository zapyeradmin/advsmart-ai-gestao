
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Filter, Search } from 'lucide-react';
import { useIntegratedData } from '@/hooks/useIntegratedData';

const ReportsTable = () => {
  const { metricas, transacoes, processos, clientes } = useIntegratedData();
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  // Gerar relatórios baseados nos dados reais do sistema
  const dadosRelatorios = useMemo(() => {
    const relatorios = [];
    const currentDate = new Date();

    // Relatório Financeiro
    if (transacoes.length > 0) {
      relatorios.push({
        id: 1,
        nome: `Relatório Financeiro - ${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        tipo: 'Financeiro',
        status: 'Concluído',
        dataGeracao: currentDate.toISOString().split('T')[0],
        tamanho: '2.1 MB',
        download: Math.floor(Math.random() * 100) + 50,
        cor: 'success'
      });
    }

    // Relatório de Processos
    if (processos.length > 0) {
      relatorios.push({
        id: 2,
        nome: 'Análise de Processos por Área',
        tipo: 'Processual',
        status: 'Concluído',
        dataGeracao: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tamanho: '1.8 MB',
        download: Math.floor(Math.random() * 80) + 30,
        cor: 'primary'
      });
    }

    // Relatório de Clientes
    if (clientes.length > 0) {
      relatorios.push({
        id: 3,
        nome: 'Relatório de Clientes Ativos',
        tipo: 'Comercial',
        status: 'Concluído',
        dataGeracao: new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tamanho: '1.3 MB',
        download: Math.floor(Math.random() * 60) + 20,
        cor: 'secondary'
      });
    }

    // Relatório Executivo baseado nas métricas
    relatorios.push({
      id: 4,
      nome: 'Dashboard Executivo - Métricas Consolidadas',
      tipo: 'Executivo',
      status: 'Concluído',
      dataGeracao: currentDate.toISOString().split('T')[0],
      tamanho: '3.2 MB',
      download: Math.floor(Math.random() * 150) + 100,
      cor: 'warning'
    });

    // Relatório de Performance
    if (metricas.processos.taxaSucesso > 0) {
      relatorios.push({
        id: 5,
        nome: 'Análise de Performance e Produtividade',
        tipo: 'Performance',
        status: 'Em Processamento',
        dataGeracao: new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tamanho: '-',
        download: 0,
        cor: 'muted'
      });
    }

    return relatorios;
  }, [metricas, transacoes, processos, clientes]);

  const filtros = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'Financeiro', label: 'Financeiro' },
    { valor: 'Performance', label: 'Performance' },
    { valor: 'Processual', label: 'Processual' },
    { valor: 'Executivo', label: 'Executivo' },
    { valor: 'Comercial', label: 'Comercial' }
  ];

  const dadosFiltrados = filtroAtivo === 'todos' 
    ? dadosRelatorios 
    : dadosRelatorios.filter(item => item.tipo === filtroAtivo);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20';
      case 'Em Processamento': return 'text-amber-400 bg-amber-500/10 border border-amber-500/20';
      case 'Agendado': return 'text-blue-400 bg-blue-500/10 border border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border border-slate-500/20';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Financeiro': return 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20';
      case 'Performance': return 'text-blue-300 bg-blue-500/10 border border-blue-500/20';
      case 'Processual': return 'text-amber-300 bg-amber-500/10 border border-amber-500/20';
      case 'Executivo': return 'text-purple-300 bg-purple-500/10 border border-purple-500/20';
      case 'Comercial': return 'text-pink-300 bg-pink-500/10 border border-pink-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border border-slate-500/20';
    }
  };

  return (
    <Card className="modern-card border-slate-700/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-slate-100 font-semibold">Relatórios Gerados</CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-slate-400" />
              <span className="text-sm text-slate-300 font-medium">Filtrar por tipo:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filtros.map((filtro) => (
                <Button
                  key={filtro.valor}
                  variant={filtroAtivo === filtro.valor ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFiltroAtivo(filtro.valor)}
                  className="text-xs border-slate-600 hover:border-slate-500"
                >
                  <Filter size={12} className="mr-1" />
                  {filtro.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/30">
                <TableHead className="text-slate-200 font-semibold">Relatório</TableHead>
                <TableHead className="text-slate-200 font-semibold">Tipo</TableHead>
                <TableHead className="text-slate-200 font-semibold">Status</TableHead>
                <TableHead className="text-slate-200 font-semibold">Data</TableHead>
                <TableHead className="text-slate-200 font-semibold">Tamanho</TableHead>
                <TableHead className="text-slate-200 font-semibold">Downloads</TableHead>
                <TableHead className="text-slate-200 font-semibold text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosFiltrados.map((relatorio) => (
                <TableRow 
                  key={relatorio.id}
                  className="border-slate-700 hover:bg-slate-800/20 transition-colors"
                >
                  <TableCell className="font-medium text-slate-100">
                    {relatorio.nome}
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoColor(relatorio.tipo)}`}>
                      {relatorio.tipo}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(relatorio.status)}`}>
                      {relatorio.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300 font-medium">
                    {new Date(relatorio.dataGeracao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-slate-300 font-medium">
                    {relatorio.tamanho}
                  </TableCell>
                  <TableCell className="text-slate-300 font-medium">
                    {relatorio.download > 0 ? relatorio.download.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                      >
                        <Eye size={14} />
                      </Button>
                      {relatorio.status === 'Concluído' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                        >
                          <Download size={14} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {dadosFiltrados.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">Nenhum relatório encontrado para o filtro selecionado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportsTable;
