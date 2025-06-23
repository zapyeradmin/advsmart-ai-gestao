
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Building, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface ProcessViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  process: any;
}

const ProcessViewModal = ({ isOpen, onClose, process }: ProcessViewModalProps) => {
  if (!process) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-blue-600';
      case 'Aguardando': return 'bg-yellow-600';
      case 'Finalizado': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Urgente': return 'bg-red-600';
      case 'Alta': return 'bg-orange-600';
      case 'Normal': return 'bg-green-600';
      case 'Baixa': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center">
            <FileText className="mr-2" size={20} />
            Processo {process.numero}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Informações Básicas */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Número:</span>
                <p className="text-white font-mono text-sm">{process.numero}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Assunto:</span>
                <p className="text-white">{process.assunto}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Área:</span>
                <Badge className="ml-2">{process.area}</Badge>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Instância:</span>
                <p className="text-white">{process.instancia}</p>
              </div>
            </CardContent>
          </Card>

          {/* Cliente */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                {process.clienteTipo === 'PF' ? 
                  <User size={16} className="text-blue-400 mr-2" /> : 
                  <Building size={16} className="text-green-400 mr-2" />
                }
                <span className="text-white">{process.cliente}</span>
              </div>
              <Badge variant={process.clienteTipo === 'PF' ? 'default' : 'secondary'}>
                {process.clienteTipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </Badge>
            </CardContent>
          </Card>

          {/* Status e Prioridade */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <Badge className={`ml-2 ${getStatusColor(process.status)}`}>
                  {process.status}
                </Badge>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Urgência:</span>
                <Badge className={`ml-2 ${getPriorityColor(process.urgencia)}`}>
                  {process.urgencia}
                </Badge>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Responsável:</span>
                <p className="text-white">{process.responsavel}</p>
              </div>
            </CardContent>
          </Card>

          {/* Informações Judiciais */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informações Judiciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Comarca:</span>
                <p className="text-white">{process.comarca}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Vara:</span>
                <p className="text-white">{process.vara}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Valor da Causa:</span>
                <p className="text-white">{process.valorCausa}</p>
              </div>
            </CardContent>
          </Card>

          {/* Datas Importantes */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Datas Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <div>
                  <span className="text-gray-400 text-sm">Distribuição:</span>
                  <p className="text-white">{new Date(process.dataDistribuicao).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              {process.proximoPrazo && (
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-orange-400 mr-2" />
                  <div>
                    <span className="text-gray-400 text-sm">Próximo Prazo:</span>
                    <p className="text-white">{new Date(process.proximoPrazo).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              )}
              {process.proximaAudiencia && (
                <div className="flex items-center">
                  <Clock size={16} className="text-blue-400 mr-2" />
                  <div>
                    <span className="text-gray-400 text-sm">Próxima Audiência:</span>
                    <p className="text-white">{new Date(process.proximaAudiencia).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Andamentos */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Andamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{process.andamentos}</div>
                <div className="text-gray-400 text-sm">Total de andamentos</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Último andamento:</span>
                <p className="text-white">{new Date(process.ultimoAndamento).toLocaleDateString('pt-BR')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Observações */}
        {process.observacoes && (
          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-sm">{process.observacoes}</p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProcessViewModal;
