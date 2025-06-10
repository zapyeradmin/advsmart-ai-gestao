
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, AlertTriangle, CheckCircle, Clock, User, Building, FileText, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProcessModal from '@/components/modals/ProcessModal';

const Processos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterResponsavel, setFilterResponsavel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const processos = [
    {
      id: 1,
      numero: '0001234-12.2023.8.26.0100',
      cliente: 'Maria Silva Santos',
      clienteId: '1',
      clienteTipo: 'PF',
      area: 'Trabalhista',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '3ª Vara do Trabalho',
      assunto: 'Rescisão Indireta de Contrato de Trabalho',
      status: 'Em Andamento',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 15.000,00',
      dataDistribuicao: '2023-10-15',
      proximoPrazo: '2024-01-20',
      proximaAudiencia: '2024-01-25',
      urgencia: 'Normal',
      andamentos: 12,
      ultimoAndamento: '2023-12-08',
      observacoes: 'Cliente busca indenização por danos morais'
    },
    {
      id: 2,
      numero: '0005678-45.2023.8.26.0100',
      cliente: 'Empresa ABC Ltda.',
      clienteId: '2',
      clienteTipo: 'PJ',
      area: 'Empresarial',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '1ª Vara Empresarial',
      assunto: 'Dissolução Parcial de Sociedade',
      status: 'Aguardando',
      responsavel: 'Dra. Camila Santos',
      valorCausa: 'R$ 50.000,00',
      dataDistribuicao: '2023-11-02',
      proximoPrazo: '2024-01-15',
      proximaAudiencia: null,
      urgencia: 'Alta',
      andamentos: 8,
      ultimoAndamento: '2023-12-10',
      observacoes: 'Aguardando documentação complementar'
    },
    {
      id: 3,
      numero: '0009876-54.2023.8.26.0100',
      cliente: 'João Carlos Mendes',
      clienteId: '3',
      clienteTipo: 'PF',
      area: 'Cível',
      instancia: '1ª Instância',
      comarca: 'Guarulhos',
      vara: '2ª Vara Cível',
      assunto: 'Indenização por Danos Morais e Materiais',
      status: 'Finalizado',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 25.000,00',
      dataDistribuicao: '2023-09-20',
      proximoPrazo: null,
      proximaAudiencia: null,
      urgencia: 'Normal',
      andamentos: 25,
      ultimoAndamento: '2023-12-01',
      observacoes: 'Processo finalizado com acordo'
    }
  ];

  const filteredProcessos = processos.filter(processo => {
    const matchesSearch = processo.numero.includes(searchTerm) ||
                         processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         processo.assunto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = filterArea === '' || processo.area === filterArea;
    const matchesStatus = filterStatus === '' || processo.status === filterStatus;
    const matchesResponsavel = filterResponsavel === '' || processo.responsavel === filterResponsavel;
    
    return matchesSearch && matchesArea && matchesStatus && matchesResponsavel;
  });

  const handleSaveProcess = (processData: any) => {
    console.log('Novo processo:', processData);
    toast({
      title: "Sucesso!",
      description: "Processo cadastrado com sucesso.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em Andamento': return <Clock size={12} className="text-blue-400" />;
      case 'Aguardando': return <AlertTriangle size={12} className="text-yellow-400" />;
      case 'Finalizado': return <CheckCircle size={12} className="text-green-400" />;
      default: return <Clock size={12} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Urgente': return 'text-red-400';
      case 'Alta': return 'text-orange-400';
      case 'Normal': return 'text-green-400';
      case 'Baixa': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const areas = [...new Set(processos.map(p => p.area))];
  const responsaveis = [...new Set(processos.map(p => p.responsavel))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Acompanhamento Processual</h1>
          <p className="text-gray-400">Gerencie processos jurídicos com integração completa aos clientes</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} className="mr-2" />
          Novo Processo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <FileText className="text-primary mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-white">{processos.length}</div>
              <div className="text-gray-400 text-sm">Total de Processos</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Clock className="text-blue-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-blue-400">{processos.filter(p => p.status === 'Em Andamento').length}</div>
              <div className="text-gray-400 text-sm">Em Andamento</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-yellow-400">{processos.filter(p => p.status === 'Aguardando').length}</div>
              <div className="text-gray-400 text-sm">Aguardando</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <CheckCircle className="text-green-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-green-400">{processos.filter(p => p.status === 'Finalizado').length}</div>
              <div className="text-gray-400 text-sm">Finalizados</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Calendar className="text-purple-400 mr-2" size={20} />
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {processos.filter(p => p.proximoPrazo && new Date(p.proximoPrazo) <= new Date(Date.now() + 7*24*60*60*1000)).length}
              </div>
              <div className="text-gray-400 text-sm">Prazos em 7 dias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar por número, cliente ou assunto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">Todas as Áreas</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">Todos os Status</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Suspenso">Suspenso</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            <select
              value={filterResponsavel}
              onChange={(e) => setFilterResponsavel(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">Todos os Responsáveis</option>
              {responsaveis.map(resp => (
                <option key={resp} value={resp}>{resp}</option>
              ))}
            </select>

            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter size={16} className="mr-2" />
              Mais Filtros
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Processes Table */}
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Processo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Área & Instância</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Responsável</th>
                <th className="text-left p-4 text-gray-300 font-medium">Prazos & Datas</th>
                <th className="text-left p-4 text-gray-300 font-medium">Andamentos</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcessos.map((processo) => (
                <tr key={processo.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div>
                      <div className="flex items-center">
                        <div className="font-mono text-sm text-white">{processo.numero}</div>
                        <div className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(processo.urgencia)}`}></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{processo.assunto}</div>
                      <div className="text-xs text-gray-500">{processo.comarca} • {processo.vara}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {processo.clienteTipo === 'PF' ? 
                        <User size={14} className="mr-1 text-blue-400" /> : 
                        <Building size={14} className="mr-1 text-green-400" />
                      }
                      <div>
                        <div className="text-white text-sm">{processo.cliente}</div>
                        <div className="text-xs text-gray-400">{processo.clienteTipo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                        {processo.area}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">{processo.instancia}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {getStatusIcon(processo.status)}
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                        processo.status === 'Em Andamento' 
                          ? 'bg-blue-900/50 text-blue-400' 
                          : processo.status === 'Aguardando'
                          ? 'bg-yellow-900/50 text-yellow-400'
                          : 'bg-green-900/50 text-green-400'
                      }`}>
                        {processo.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300 text-sm">{processo.responsavel}</div>
                    <div className="text-xs text-gray-500">Valor: {processo.valorCausa}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {processo.proximoPrazo && (
                        <div className="flex items-center text-xs">
                          <Calendar size={10} className="mr-1 text-orange-400" />
                          <span className="text-gray-300">
                            Prazo: {new Date(processo.proximoPrazo).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      {processo.proximaAudiencia && (
                        <div className="flex items-center text-xs">
                          <Clock size={10} className="mr-1 text-blue-400" />
                          <span className="text-gray-300">
                            Audiência: {new Date(processo.proximaAudiencia).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Dist: {new Date(processo.dataDistribuicao).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-center">
                      <div className="text-white font-medium">{processo.andamentos}</div>
                      <div className="text-xs text-gray-500">andamentos</div>
                      <div className="text-xs text-gray-400">
                        Último: {new Date(processo.ultimoAndamento).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <ExternalLink size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProcessos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum processo encontrado</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-400">
          Mostrando {filteredProcessos.length} de {processos.length} processos
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            1
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            Próximo
          </Button>
        </div>
      </div>

      {/* Process Modal */}
      <ProcessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProcess}
      />
    </div>
  );
};

export default Processos;
