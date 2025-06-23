
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, FileText, Edit } from 'lucide-react';
import { Event } from '@/types/event';

interface EventViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  event: Event | null;
}

const EventViewModal = ({ isOpen, onClose, onEdit, event }: EventViewModalProps) => {
  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-900/50 text-green-400';
      case 'Pendente':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'Cancelado':
        return 'bg-red-900/50 text-red-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Audiência':
        return <Users size={16} />;
      case 'Reunião':
        return <Calendar size={16} />;
      case 'Videoconferência':
        return <FileText size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-card border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Detalhes do Evento</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Edit size={14} className="mr-1" />
              Editar
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Título e Tipo */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                {getTipoIcon(event.tipo)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{event.titulo}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-blue-900/50 text-blue-400">
                    {event.tipo}
                  </Badge>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
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
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm font-medium">Data</span>
                </div>
                <div className="text-white">
                  {new Date(event.data).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div>
                <div className="flex items-center text-gray-300 mb-1">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm font-medium">Horário</span>
                </div>
                <div className="text-white">{event.hora}</div>
              </div>

              <div>
                <div className="flex items-center text-gray-300 mb-1">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm font-medium">Local</span>
                </div>
                <div className="text-white">{event.local}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-300 mb-1">Cliente</div>
                <div className="text-white font-medium">{event.cliente}</div>
              </div>

              {event.processo && (
                <div>
                  <div className="text-sm font-medium text-gray-300 mb-1">Processo</div>
                  <div className="text-primary font-mono text-sm">{event.processo}</div>
                </div>
              )}
            </div>
          </div>

          {/* Participantes */}
          <div>
            <div className="flex items-center text-gray-300 mb-2">
              <Users size={16} className="mr-2" />
              <span className="text-sm font-medium">Participantes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.participantes.map((participante, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                  {participante}
                </Badge>
              ))}
            </div>
          </div>

          {/* Observações */}
          {event.observacoes && (
            <div>
              <div className="text-sm font-medium text-gray-300 mb-1">Observações</div>
              <div className="text-white bg-gray-800 p-3 rounded-lg">
                {event.observacoes}
              </div>
            </div>
          )}
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

export default EventViewModal;
