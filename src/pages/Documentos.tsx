import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, File, FileText, Download, Eye, Edit, Trash2, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCrudOperations } from "@/hooks/useCrudOperations";
import DocumentModal from "@/components/modals/DocumentModal";
import DocumentViewModal from "@/components/modals/DocumentViewModal";
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog";
import { Document, DocumentFormData } from '@/types/document';

const Documentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const {
    selectedItem,
    isViewModalOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeModals,
    setIsEditModalOpen
  } = useCrudOperations();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [documentos, setDocumentos] = useState<Document[]>([
    {
      id: 1,
      nome: 'Petição Inicial - Maria Silva',
      tipo: 'Petição',
      categoria: 'Processual',
      cliente: 'Maria Silva Santos',
      processo: '0001234-12.2023.8.26.0100',
      tamanho: '2.4 MB',
      dataUpload: '2024-01-10',
      autor: 'Dr. Ricardo Oliveira',
      status: 'Finalizado'
    },
    {
      id: 2,
      nome: 'Contrato de Prestação de Serviços',
      tipo: 'Contrato',
      categoria: 'Comercial',
      cliente: 'Empresa ABC Ltda.',
      processo: null,
      tamanho: '1.8 MB',
      dataUpload: '2024-01-08',
      autor: 'Dra. Camila Santos',
      status: 'Em Revisão'
    },
    {
      id: 3,
      nome: 'Recurso de Apelação',
      tipo: 'Recurso',
      categoria: 'Processual',
      cliente: 'João Carlos Mendes',
      processo: '0009876-54.2023.8.26.0100',
      tamanho: '3.1 MB',
      dataUpload: '2024-01-05',
      autor: 'Dr. Ricardo Oliveira',
      status: 'Finalizado'
    },
    {
      id: 4,
      nome: 'Parecer Jurídico - Consulta Empresarial',
      tipo: 'Parecer',
      categoria: 'Consultoria',
      cliente: 'Startup XYZ',
      processo: null,
      tamanho: '1.2 MB',
      dataUpload: '2024-01-12',
      autor: 'Dra. Camila Santos',
      status: 'Rascunho'
    }
  ]);

  const filteredDocumentos = documentos.filter(doc =>
    doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoDocumento = () => {
    setIsCreateModalOpen(true);
  };

  const handleUpload = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveDocument = (documentData: DocumentFormData) => {
    if (selectedItem) {
      // Editing existing document
      setDocumentos(prev => prev.map(doc => 
        doc.id === selectedItem.id 
          ? { 
              ...doc, 
              ...documentData,
              processo: documentData.processo || null,
              tamanho: documentData.arquivo ? `${(documentData.arquivo.size / 1024 / 1024).toFixed(1)} MB` : doc.tamanho,
              dataUpload: documentData.arquivo ? new Date().toISOString().split('T')[0] : doc.dataUpload
            }
          : doc
      ));
      toast({
        title: "Documento atualizado",
        description: "O documento foi atualizado com sucesso.",
      });
    } else {
      // Creating new document
      const newDocument: Document = {
        id: Date.now(),
        ...documentData,
        processo: documentData.processo || null,
        tamanho: documentData.arquivo ? `${(documentData.arquivo.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
        dataUpload: new Date().toISOString().split('T')[0]
      };
      setDocumentos(prev => [...prev, newDocument]);
      toast({
        title: "Documento criado",
        description: "Novo documento foi criado com sucesso.",
      });
    }
  };

  const handleDeleteDocument = (id: number) => {
    setDocumentos(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDownloadDocument = (documento: Document) => {
    // In a real app, this would trigger the actual download
    toast({
      title: "Download iniciado",
      description: `Fazendo download de: ${documento.nome}`,
    });
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Documentos</h1>
          <p className="text-gray-400">Gerencie todos os documentos jurídicos e templates</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300"
            onClick={handleUpload}
          >
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
          <Button
            className="bg-primary hover:bg-primary-hover text-white"
            onClick={handleNovoDocumento}
          >
            <Plus size={16} className="mr-2" />
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-white">{documentos.length}</div>
          <div className="text-gray-400 text-sm">Total de Documentos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{documentos.filter(d => d.status === 'Finalizado').length}</div>
          <div className="text-gray-400 text-sm">Finalizados</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">{documentos.filter(d => d.status === 'Em Revisão').length}</div>
          <div className="text-gray-400 text-sm">Em Revisão</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-blue-400">{documentos.filter(d => d.status === 'Rascunho').length}</div>
          <div className="text-gray-400 text-sm">Rascunhos</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Categorias
            </Button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-dark-card rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Documento</th>
                <th className="text-left p-4 text-gray-300 font-medium">Tipo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-300 font-medium">Processo</th>
                <th className="text-left p-4 text-gray-300 font-medium">Autor</th>
                <th className="text-left p-4 text-gray-300 font-medium">Tamanho</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-center p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocumentos.map((documento) => (
                <tr key={documento.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 mr-3">
                        {getTipoIcon(documento.tipo)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{documento.nome}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-400">
                      {documento.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{documento.cliente}</td>
                  <td className="p-4">
                    {documento.processo ? (
                      <span className="font-mono text-sm text-primary">{documento.processo}</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">{documento.autor}</td>
                  <td className="p-4 text-gray-300">{documento.tamanho}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(documento.status)}`}>
                      {documento.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleView(documento)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleDownloadDocument(documento)}
                      >
                        <Download size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleEdit(documento)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => handleDelete(documento)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocumentos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum documento encontrado</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <DocumentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveDocument}
        title="Novo Documento"
      />

      <DocumentModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSave={handleSaveDocument}
        document={selectedItem}
        title="Editar Documento"
      />

      <DocumentViewModal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        onEdit={() => {
          closeModals();
          setIsEditModalOpen(true);
        }}
        onDownload={() => handleDownloadDocument(selectedItem)}
        document={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={() => confirmDelete((id: string) => handleDeleteDocument(Number(id)), 'documento')}
        title="Confirmar Exclusão"
        itemName="documento"
      />
    </div>
  );
};

export default Documentos;
