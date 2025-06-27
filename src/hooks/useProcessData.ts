
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useProcessData = () => {
  const { toast } = useToast();
  
  const [processos, setProcessos] = useState([
    {
      id: 1,
      numero: '0001234-12.2023.8.26.0100',
      cliente: 'Maria Silva Santos',
      clienteId: '1',
      clienteTipo: 'PF',
      area: 'Trabalhista',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '3ª Vara do Trabalho',
      assunto: 'Rescisão Indireta de Contrato de Trabalho',
      status: 'Em Andamento',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 15.000,00',
      dataDistribuicao: '2023-10-15',
      proximoPrazo: '2024-01-20',
      proximaAudiencia: '2024-01-25',
      urgencia: 'Normal',
      andamentos: 12,
      ultimoAndamento: '2023-12-08',
      observacoes: 'Cliente busca indenização por danos morais'
    },
    {
      id: 2,
      numero: '0005678-45.2023.8.26.0100',
      cliente: 'Empresa ABC Ltda.',
      clienteId: '2',
      clienteTipo: 'PJ',
      area: 'Empresarial',
      instancia: '1ª Instância',
      comarca: 'São Paulo',
      vara: '1ª Vara Empresarial',
      assunto: 'Dissolução Parcial de Sociedade',
      status: 'Aguardando',
      responsavel: 'Dra. Camila Santos',
      valorCausa: 'R$ 50.000,00',
      dataDistribuicao: '2023-11-02',
      proximoPrazo: '2024-01-15',
      proximaAudiencia: null,
      urgencia: 'Alta',
      andamentos: 8,
      ultimoAndamento: '2023-12-10',
      observacoes: 'Aguardando documentação complementar'
    },
    {
      id: 3,
      numero: '0009876-54.2023.8.26.0100',
      cliente: 'João Carlos Mendes',
      clienteId: '3',
      clienteTipo: 'PF',
      area: 'Cível',
      instancia: '1ª Instância',
      comarca: 'Guarulhos',
      vara: '2ª Vara Cível',
      assunto: 'Indenização por Danos Morais e Materiais',
      status: 'Finalizado',
      responsavel: 'Dr. Ricardo Oliveira',
      valorCausa: 'R$ 25.000,00',
      dataDistribuicao: '2023-09-20',
      proximoPrazo: null,
      proximaAudiencia: null,
      urgencia: 'Normal',
      andamentos: 25,
      ultimoAndamento: '2023-12-01',
      observacoes: 'Processo finalizado com acordo'
    }
  ]);

  const handleSaveProcess = (processData: any, selectedItem: any, closeAddModal: () => void, closeModals: () => void) => {
    if (selectedItem) {
      // Editando processo existente
      setProcessos(prev => prev.map(p => 
        p.id === selectedItem.id ? { ...p, ...processData } : p
      ));
      toast({
        title: "Processo atualizado!",
        description: "As informações do processo foram atualizadas com sucesso.",
      });
      closeModals();
    } else {
      // Adicionando novo processo
      const newProcess = {
        ...processData,
        id: Date.now(),
        andamentos: 0,
        ultimoAndamento: new Date().toISOString(),
      };
      setProcessos(prev => [...prev, newProcess]);
      toast({
        title: "Processo cadastrado!",
        description: "Novo processo foi adicionado com sucesso.",
      });
      closeAddModal();
    }
  };

  const handleDeleteProcess = (id: string) => {
    setProcessos(prev => prev.filter(p => p.id.toString() !== id));
  };

  return {
    processos,
    handleSaveProcess,
    handleDeleteProcess
  };
};
