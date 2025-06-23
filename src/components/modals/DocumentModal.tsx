
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File, X } from 'lucide-react';
import { Document, DocumentFormData } from '@/types/document';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (documentData: DocumentFormData) => void;
  document?: Document | null;
  title?: string;
}

const DocumentModal = ({ isOpen, onClose, onSave, document, title }: DocumentModalProps) => {
  const [formData, setFormData] = useState<DocumentFormData>({
    nome: '',
    tipo: 'Outro',
    categoria: 'Administrativo',
    cliente: '',
    processo: '',
    autor: '',
    status: 'Rascunho',
    observacoes: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document) {
      setFormData({
        nome: document.nome,
        tipo: document.tipo,
        categoria: document.categoria,
        cliente: document.cliente,
        processo: document.processo || '',
        autor: document.autor,
        status: document.status,
        observacoes: document.observacoes || ''
      });
    } else {
      setFormData({
        nome: '',
        tipo: 'Outro',
        categoria: 'Administrativo',
        cliente: '',
        processo: '',
        autor: '',
        status: 'Rascunho',
        observacoes: ''
      });
      setSelectedFile(null);
    }
  }, [document, isOpen]);

  const handleInputChange = (field: keyof DocumentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.nome) {
        setFormData(prev => ({ ...prev, nome: file.name }));
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.nome) {
        setFormData(prev => ({ ...prev, nome: file.name }));
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const documentData = { ...formData };
    if (selectedFile) {
      documentData.arquivo = selectedFile;
    }
    onSave(documentData);
    onClose();
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-card border-gray-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{title || (document ? 'Editar Documento' : 'Novo Documento')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Upload Area */}
          {!document && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <File size={24} className="text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-300">Clique ou arraste um arquivo para fazer upload</p>
                  <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX, JPG, PNG</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="nome">Nome do Documento</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Petição">Petição</SelectItem>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                  <SelectItem value="Recurso">Recurso</SelectItem>
                  <SelectItem value="Parecer">Parecer</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Processual">Processual</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Consultoria">Consultoria</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => handleInputChange('cliente', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="processo">Processo (Opcional)</Label>
              <Input
                id="processo"
                value={formData.processo}
                onChange={(e) => handleInputChange('processo', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: 0001234-12.2023.8.26.0100"
              />
            </div>

            <div>
              <Label htmlFor="autor">Autor</Label>
              <Input
                id="autor"
                value={formData.autor}
                onChange={(e) => handleInputChange('autor', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Em Revisão">Em Revisão</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-700 text-gray-300">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {document ? 'Salvar Alterações' : 'Criar Documento'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentModal;
