
export interface Event {
  id: number;
  titulo: string;
  tipo: 'Audiência' | 'Reunião' | 'Videoconferência';
  cliente: string;
  processo: string | null;
  data: string;
  hora: string;
  local: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  participantes: string[];
  observacoes?: string;
}

export interface EventFormData {
  titulo: string;
  tipo: 'Audiência' | 'Reunião' | 'Videoconferência';
  cliente: string;
  processo?: string;
  data: string;
  hora: string;
  local: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  participantes: string[];
  observacoes?: string;
}
