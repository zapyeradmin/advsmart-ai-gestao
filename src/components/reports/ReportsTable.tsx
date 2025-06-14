
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Filter, Search } from 'lucide-react';

const ReportsTable = () => {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  const dadosRelatorios = [
    {
      id: 1,
      nome: 'Relatório Financeiro Janeiro',
      tipo: 'Financeiro',
      status: 'Concluído',
      dataGeracao: '2024-02-01',
      tamanho: '2.5 MB',
      download: 847,
      cor: 'success'
    },
    {
      id: 2,
      nome: 'Análise de Performance Q1',
      tipo: 'Performance',
      status: 'Concluído',
      dataGeracao: '2024-01-28',
      tamanho: '1.8 MB',
      download: 623,
      cor: 'primary'
    },
    {
      id: 3,
      nome: 'Relatório de Processos',
      tipo: 'Processual',
      status: 'Em Processamento',
      dataGeracao: '2024-02-03',
      tamanho: '3.1 MB',
      download: 0,
      cor: 'warning'
    },
    {
      id: 4,
      nome: 'Dashboard Executivo',
      tipo: 'Executivo',
      status: 'Concluído',
      dataGeracao: '2024-01-30',
      tamanho: '4.2 MB',
      download: 1240,
      cor: 'secondary'
    },
    {
      id: 5,
      nome: 'Análise de Clientes',
      tipo: 'Comercial',
      status: 'Agendado',
      dataGeracao: '2024-02-05',
      tamanho: '-',
      download: 0,
      cor: 'muted'
    }
  ];

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
