
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface ClientViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

const ClientViewModal = ({ isOpen, onClose, client }: ClientViewModalProps) => {
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center">
            {client.personType === 'fisica' ? 
              <User className="mr-2" size={20} /> : 
              <Building className="mr-2" size={20} />
            }
            {client.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Tipo:</span>
                <Badge className="ml-2" variant={client.personType === 'fisica' ? 'default' : 'secondary'}>
                  {client.personType === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </Badge>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Documento:</span>
                <p className="text-white">{client.document}</p>
              </div>
              {client.fantasyName && (
                <div>
                  <span className="text-gray-400 text-sm">Nome Fantasia:</span>
                  <p className="text-white">{client.fantasyName}</p>
                </div>
              )}
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <Badge className="ml-2" variant={client.status === 'ativo' ? 'default' : 'secondary'}>
                  {client.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2" />
                <span className="text-white">{client.email}</span>
              </div>
              {client.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <span className="text-white">{client.phone}</span>
                </div>
              )}
              {client.whatsapp && (
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <span className="text-white">{client.whatsapp} (WhatsApp)</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Endereço */}
          {client.address && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <MapPin size={16} className="text-gray-400 mr-2 mt-1" />
                  <div className="text-white">
                    <p>{client.address}, {client.number}</p>
                    {client.complement && <p>{client.complement}</p>}
                    <p>{client.neighborhood} - {client.city}/{client.state}</p>
                    <p>CEP: {client.zipCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações Adicionais */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.origin && (
                <div>
                  <span className="text-gray-400 text-sm">Origem:</span>
                  <p className="text-white">{client.origin}</p>
                </div>
              )}
              {client.priority && (
                <div>
                  <span className="text-gray-400 text-sm">Prioridade:</span>
                  <Badge className="ml-2">
                    {client.priority}
                  </Badge>
                </div>
              )}
              {client.observations && (
                <div>
                  <span className="text-gray-400 text-sm">Observações:</span>
                  <p className="text-white text-sm">{client.observations}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientViewModal;
