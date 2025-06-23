
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { Event, EventFormData } from '@/types/event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventFormData) => void;
  event?: Event | null;
  title?: string;
}

const EventModal = ({ isOpen, onClose, onSave, event, title }: EventModalProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    titulo: '',
    tipo: 'Reunião',
    cliente: '',
    processo: '',
    data: '',
    hora: '',
    local: '',
    status: 'Pendente',
    participantes: [],
    observacoes: ''
  });

  const [newParticipant, setNewParticipant] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        titulo: event.titulo,
        tipo: event.tipo,
        cliente: event.cliente,
        processo: event.processo || '',
        data: event.data,
        hora: event.hora,
        local: event.local,
        status: event.status,
        participantes: event.participantes,
        observacoes: event.observacoes || ''
      });
    } else {
      setFormData({
        titulo: '',
        tipo: 'Reunião',
        cliente: '',
        processo: '',
        data: '',
        hora: '',
        local: '',
        status: 'Pendente',
        participantes: [],
        observacoes: ''
      });
    }
  }, [event, isOpen]);

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addParticipant = () => {
    if (newParticipant.trim() && !formData.participantes.includes(newParticipant.trim())) {
      setFormData(prev => ({
        ...prev,
        participantes: [...prev.participantes, newParticipant.trim()]
      }));
      setNewParticipant('');
    }
  };

  const removeParticipant = (participant: string) => {
    setFormData(prev => ({
      ...prev,
      participantes: prev.participantes.filter(p => p !== participant)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-card border-gray-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{title || (event ? 'Editar Evento' : 'Novo Evento')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="titulo">Título do Evento</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Evento</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Audiência">Audiência</SelectItem>
                  <SelectItem value="Reunião">Reunião</SelectItem>
                  <SelectItem value="Videoconferência">Videoconferência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
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
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="hora">Hora</Label>
              <Input
                id="hora"
                type="time"
                value={formData.hora}
                onChange={(e) => handleInputChange('hora', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="local">Local</Label>
            <Input
              id="local"
              value={formData.local}
              onChange={(e) => handleInputChange('local', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label>Participantes</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                placeholder="Nome do participante"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="button" onClick={addParticipant} variant="outline" className="border-gray-700">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.participantes.map((participant, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
                  {participant}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-gray-400 hover:text-white"
                    onClick={() => removeParticipant(participant)}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
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
              {event ? 'Salvar Alterações' : 'Criar Evento'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
