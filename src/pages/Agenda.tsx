
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, Clock, Users, MapPin, Video, Eye, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCrudOperations } from "@/hooks/useCrudOperations";
import EventModal from "@/components/modals/EventModal";
import EventViewModal from "@/components/modals/EventViewModal";
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog";
import { Event, EventFormData } from '@/types/event';

const Agenda = () => {
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

  const [eventos, setEventos] = useState<Event[]>([
    {
      id: 1,
      titulo: 'Audiência de Instrução',
      tipo: 'Audiência',
      cliente: 'Maria Silva Santos',
      processo: '0001234-12.2023.8.26.0100',
      data: '2024-01-15',
      hora: '14:30',
      local: 'Fórum Central - Sala 15',
      status: 'Confirmado',
      participantes: ['Dr. Ricardo Oliveira', 'Maria Silva Santos']
    },
    {
      id: 2,
      titulo: 'Reunião Cliente - Consultoria',
      tipo: 'Reunião',
      cliente: 'Empresa ABC Ltda.',
      processo: null,
      data: '2024-01-16',
      hora: '10:00',
      local: 'Escritório - Sala de Reuniões',
      status: 'Pendente',
      participantes: ['Dra. Camila Santos', 'João Carlos (ABC)']
    },
    {
      id: 3,
      titulo: 'Videoconferência - Mediação',
      tipo: 'Videoconferência',
      cliente: 'João Carlos Mendes',
      processo: '0009876-54.2023.8.26.0100',
      data: '2024-01-17',
      hora: '15:00',
      local: 'Online - Google Meet',
      status: 'Confirmado',
      participantes: ['Dr. Ricardo Oliveira', 'João Carlos Mendes', 'Mediador']
    }
  ]);

  const filteredEventos = eventos.filter(evento =>
    evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoEvento = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveEvent = (eventData: EventFormData) => {
    if (selectedItem) {
      // Editing existing event
      setEventos(prev => prev.map(evento => 
        evento.id === selectedItem.id 
          ? { ...evento, ...eventData }
          : evento
      ));
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso.",
      });
    } else {
      // Creating new event
      const newEvent: Event = {
        id: Date.now(),
        ...eventData,
        participantes: eventData.participantes || []
      };
      setEventos(prev => [...prev, newEvent]);
      toast({
        title: "Evento criado",
        description: "Novo evento foi criado com sucesso.",
      });
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEventos(prev => prev.filter(evento => evento.id !== id));
  };

  const handleOpenEvent = (evento: Event) => {
    // In a real app, this would navigate to a dedicated event page
    toast({
      title: "Abrindo evento",
      description: `Navegando para página dedicada do evento: ${evento.titulo}`,
    });
  };

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
        return <Video size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Agenda</h1>
          <p className="text-gray-400">Gerencie compromissos, audiências e reuniões</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary-hover text-white"
          onClick={handleNovoEvento}
        >
          <Plus size={16} className="mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-white">{eventos.length}</div>
          <div className="text-gray-400 text-sm">Total de Eventos</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-blue-400">{eventos.filter(e => e.tipo === 'Audiência').length}</div>
          <div className="text-gray-400 text-sm">Audiências</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-green-400">{eventos.filter(e => e.tipo === 'Reunião').length}</div>
          <div className="text-gray-400 text-sm">Reuniões</div>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
          <div className="text-2xl font-bold text-purple-400">{eventos.filter(e => e.status === 'Confirmado').length}</div>
          <div className="text-gray-400 text-sm">Confirmados</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEventos.map((evento) => (
          <div key={evento.id} className="bg-dark-card rounded-lg p-6 border border-gray-800 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                    {getTipoIcon(evento.tipo)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{evento.titulo}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                      {evento.tipo}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex items-center text-gray-300 mb-2">
                      <Calendar size={14} className="mr-2" />
                      <span className="text-sm">
                        {new Date(evento.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 mb-2">
                      <Clock size={14} className="mr-2" />
                      <span className="text-sm">{evento.hora}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin size={14} className="mr-2" />
                      <span className="text-sm">{evento.local}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Cliente:</div>
                    <div className="text-white font-medium mb-2">{evento.cliente}</div>
                    
                    {evento.processo && (
                      <>
                        <div className="text-sm text-gray-400 mb-1">Processo:</div>
                        <div className="text-primary text-sm font-mono">{evento.processo}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Participantes:</div>
                  <div className="flex flex-wrap gap-2">
                    {evento.participantes.map((participante, index) => (
                      <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
                        {participante}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(evento.status)} mb-4`}>
                  {evento.status}
                </span>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700 text-gray-300"
                    onClick={() => handleView(evento)}
                  >
                    <Eye size={14} className="mr-1" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700 text-gray-300"
                    onClick={() => handleEdit(evento)}
                  >
                    <Edit size={14} className="mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700 text-gray-300"
                    onClick={() => handleOpenEvent(evento)}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Abrir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700 text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(evento)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEventos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">Nenhum evento encontrado</p>
        </div>
      )}

      {/* Modals */}
      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveEvent}
        title="Novo Evento"
      />

      <EventModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onSave={handleSaveEvent}
        event={selectedItem}
        title="Editar Evento"
      />

      <EventViewModal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        onEdit={() => {
          closeModals();
          setIsEditModalOpen(true);
        }}
        event={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeModals}
        onConfirm={() => confirmDelete(handleDeleteEvent, 'evento')}
        title="Confirmar Exclusão"
        itemName="evento"
      />
    </div>
  );
};

export default Agenda;
