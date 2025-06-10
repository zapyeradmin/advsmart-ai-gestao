
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessForm, processSchema } from '@/types/process';
import ProcessIdentificationForm from '@/components/process/ProcessIdentificationForm';
import ProcessDetailsForm from '@/components/process/ProcessDetailsForm';
import ProcessBillingForm from '@/components/process/ProcessBillingForm';
import ProcessManagementForm from '@/components/process/ProcessManagementForm';

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (processData: ProcessForm) => void;
}

const ProcessModal: React.FC<ProcessModalProps> = ({ isOpen, onClose, onSave }) => {
  const form = useForm<ProcessForm>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      numero: "",
      clienteId: "",
      area: "",
      instancia: "",
      comarca: "",
      vara: "",
      assunto: "",
      valorCausa: "",
      dataDistribuicao: "",
      dataAudiencia: "",
      responsavel: "",
      status: "Em Andamento",
      urgencia: "Normal",
      observacoes: "",
      formaCobranca: "",
      valorFixo: "",
      percentualExito: "",
      valorEntrada: "",
      valorAtosProcessuais: "",
      modoPagamento: "",
      numParcelas: "",
    },
  });

  const onSubmit = (data: ProcessForm) => {
    onSave(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Novo Processo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProcessIdentificationForm form={form} />
            <ProcessDetailsForm form={form} />
            <ProcessBillingForm form={form} />
            <ProcessManagementForm form={form} />

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gray-700 text-gray-300"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white"
              >
                Salvar Processo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessModal;
