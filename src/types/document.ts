
export interface Document {
  id: number;
  nome: string;
  tipo: 'Petição' | 'Contrato' | 'Recurso' | 'Parecer' | 'Outro';
  categoria: 'Processual' | 'Comercial' | 'Consultoria' | 'Administrativo';
  cliente: string;
  processo: string | null;
  tamanho: string;
  dataUpload: string;
  autor: string;
  status: 'Finalizado' | 'Em Revisão' | 'Rascunho';
  arquivo?: File;
  observacoes?: string;
}

export interface DocumentFormData {
  nome: string;
  tipo: 'Petição' | 'Contrato' | 'Recurso' | 'Parecer' | 'Outro';
  categoria: 'Processual' | 'Comercial' | 'Consultoria' | 'Administrativo';
  cliente: string;
  processo?: string;
  autor: string;
  status: 'Finalizado' | 'Em Revisão' | 'Rascunho';
  arquivo?: File;
  observacoes?: string;
}
