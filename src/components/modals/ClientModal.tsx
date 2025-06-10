
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { X } from 'lucide-react';

// Form components
import PersonTypeSelector from "@/components/forms/client/PersonTypeSelector";
import PersonalDataForm from "@/components/forms/client/PersonalDataForm";
import ResponsibleContactForm from "@/components/forms/client/ResponsibleContactForm";
import ContactInfoForm from "@/components/forms/client/ContactInfoForm";
import OriginSystemForm from "@/components/forms/client/OriginSystemForm";
import StatusConfigForm from "@/components/forms/client/StatusConfigForm";
import ObservationsForm from "@/components/forms/client/ObservationsForm";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

const formSchema = z.object({
  personType: z.enum(['fisica', 'juridica']),
  name: z.string().min(1, "Nome é obrigatório"),
  document: z.string().min(1, "Documento é obrigatório"),
  email: z.string().email("Email inválido"),
  // ... outros campos opcionais
  fantasyName: z.string().optional(),
  rg: z.string().optional(),
  birthDate: z.string().optional(),
  maritalStatus: z.string().optional(),
  profession: z.string().optional(),
  income: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  whatsapp: z.string().optional(),
  zipCode: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default('Brasil'),
  origin: z.string().optional(),
  referredBy: z.string().optional(),
  originDate: z.string().optional(),
  originNotes: z.string().optional(),
  companyName: z.string().optional(),
  stateRegistration: z.string().optional(),
  municipalRegistration: z.string().optional(),
  cnae: z.string().optional(),
  companySize: z.string().optional(),
  responsibleName: z.string().optional(),
  responsibleRole: z.string().optional(),
  responsibleEmail: z.string().optional(),
  responsiblePhone: z.string().optional(),
  observations: z.string().optional(),
  status: z.string().default('ativo'),
  priority: z.string().default('normal'),
  tags: z.string().optional(),
  bankName: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  pixKey: z.string().optional(),
});

const ClientModal = ({ isOpen, onClose, onSave }: ClientModalProps) => {
  const [personType, setPersonType] = useState<'fisica' | 'juridica'>('fisica');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personType: 'fisica',
      name: '',
      document: '',
      email: '',
      country: 'Brasil',
      status: 'ativo',
      priority: 'normal',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({ ...values, personType });
    onClose();
    form.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Novo Cliente</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Tipo de Pessoa */}
              <PersonTypeSelector 
                personType={personType} 
                onPersonTypeChange={setPersonType} 
              />

              {/* Dados Pessoais/Empresariais */}
              <PersonalDataForm 
                control={form.control} 
                personType={personType} 
              />

              {/* Contato Responsável - apenas para PJ */}
              {personType === 'juridica' && (
                <ResponsibleContactForm control={form.control} />
              )}

              {/* Informações de Contato */}
              <ContactInfoForm control={form.control} />

              {/* Sistema de Origem */}
              <OriginSystemForm control={form.control} />

              {/* Status e Configurações */}
              <StatusConfigForm control={form.control} />

              {/* Observações Gerais */}
              <ObservationsForm control={form.control} />

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  Salvar Cliente
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
