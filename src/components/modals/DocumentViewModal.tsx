
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, File, Calendar, User, Edit, Download } from 'lucide-react';
import { Document } from '@/types/document';

interface DocumentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDownload: () => void;
  document: Document | null;
}

const DocumentViewModal = ({ isOpen, onClose, onEdit, onDownload, document }: DocumentViewModalProps) => {
  if (!document) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Finalizado':
        return 'bg-green-900/50 text-green-400';
      case 'Em Revisão':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'Rascunho':
        return 'bg-blue-900/50 text-blue-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Contrato':
      case 'Parecer':
        return <FileText size={16} />;
      default:
        return <File size={16} />;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Processual':
        return 'bg-purple-900/50 text-purple-400';
      case 'Comercial':
        return 'bg-blue-900/50 text-blue-400';
      case 'Consultoria':
        return 'bg-green-900/50 text-green-400';
      case 'Administrativo':
        return 'bg-orange-900/50 text-orange-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-card border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Detalhes do Documento</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                <Download size={14} className="mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                <Edit size={14} className="mr-1" />
                Editar
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Título e Tipo */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 mr-3">
                {getTipoIcon(document.tipo)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{document.nome}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-purple-900/50 text-purple-400">
                    {document.tipo}
                  </Badge>
                  <Badge className={getCategoriaColor(document.categoria)}>
                    {document.categoria}
                  </Badge>
                  <Badge className={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-300 mb-1">
                  <User size={16} className="mr-2" />
                  <span className="text-sm font-medium">Cliente</span>
                </div>
                <div className="text-white font-medium">{document.cliente}</div>
              </div>

              <div>
                <div className="flex items-center text-gray-300 mb-1">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm font-medium">Data de Upload</span>
                </div>
                <div className="text-white">
                  {new Date(document.dataUpload).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-300 mb-1">Tamanho</div>
                <div className="text-white">{document.tamanho}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-300 mb-1">Autor</div>
                <div className="text-white">{document.autor}</div>
              </div>

              {document.processo && (
                <div>
                  <div className="text-sm font-medium text-gray-300 mb-1">Processo</div>
                  <div className="text-primary font-mono text-sm">{document.processo}</div>
                </div>
              )}
            </div>
          </div>

          {/* Observações */}
          {document.observacoes && (
            <div>
              <div className="text-sm font-medium text-gray-300 mb-1">Observações</div>
              <div className="text-white bg-gray-800 p-3 rounded-lg">
                {document.observacoes}
              </div>
            </div>
          )}

          {/* Preview Area */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-center text-gray-400">
              <File size={48} className="mx-auto mb-2" />
              <p>Preview do documento não disponível</p>
              <p className="text-sm">Clique em "Download" para visualizar o arquivo</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewModal;
