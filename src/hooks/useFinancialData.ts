
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Transacao, Parceiro, CustoFixo } from '@/types/financial';

export const useFinancialData = () => {
  const { toast } = useToast();

  // Estados para dados financeiros
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: '1',
      tipo: 'Receita',
      descricao: 'Honorários - Maria Silva Santos',
      valor: 2500.00,
      data: '2024-01-10',
      categoria: 'Honorários',
      status: 'Pago',
      cliente: 'Maria Silva Santos'
    },
    {
      id: '2',
      tipo: 'Despesa',
      descricao: 'Aluguel do escritório',
      valor: 4500.00,
      data: '2024-01-05',
      categoria: 'Infraestrutura',
      status: 'Pago',
    },
    {
      id: '3',
      tipo: 'Receita',
      descricao: 'Consultoria Jurídica - Empresa ABC',
      valor: 8000.00,
      data: '2024-01-08',
      dataVencimento: '2024-02-08',
      categoria: 'Consultoria',
      status: 'Pendente',
      cliente: 'Empresa ABC Ltda.'
    }
  ]);

  const [custosFixos, setCustosFixos] = useState<CustoFixo[]>([
    {
      id: '1',
      descricao: 'Aluguel do Escritório',
      valor: 4500.00,
      categoria: 'Aluguel',
      diaVencimento: 10,
      ativo: true
    },
    {
      id: '2',
      descricao: 'Internet',
      valor: 150.00,
      categoria: 'Internet',
      diaVencimento: 15,
      ativo: true
    }
  ]);

  const [parceiros, setParceiros] = useState<Parceiro[]>([
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      tipo: 'Advogado',
      contato: 'carlos@exemplo.com',
      percentual: 20,
      ltv: 15000,
      ativo: true
    },
    {
      id: '2',
      nome: 'Ana Captadora',
      tipo: 'Captador',
      contato: '(11) 99999-9999',
      valorFixo: 500,
      ltv: 8000,
      ativo: true
    }
  ]);

  // Handlers para transações
  const handleAddTransacao = (transacao: Transacao) => {
    setTransacoes(prev => [...prev, transacao]);
  };

  const handleUpdateTransacao = (id: string, transacao: Transacao) => {
    setTransacoes(prev => prev.map(t => t.id === id ? { ...transacao, id } : t));
  };

  // Handlers para custos fixos
  const handleAddCusto = (custo: CustoFixo) => {
    setCustosFixos(prev => [...prev, custo]);
  };

  const handleUpdateCusto = (id: string, custo: CustoFixo) => {
    setCustosFixos(prev => prev.map(c => c.id === id ? { ...custo, id } : c));
  };

  const handleDeleteCusto = (id: string) => {
    setCustosFixos(prev => prev.filter(c => c.id !== id));
    toast({ title: "Custo fixo removido com sucesso!" });
  };

  // Handlers para parceiros
  const handleAddParceiro = (parceiro: Parceiro) => {
    setParceiros(prev => [...prev, parceiro]);
  };

  const handleUpdateParceiro = (id: string, parceiro: Parceiro) => {
    setParceiros(prev => prev.map(p => p.id === id ? { ...parceiro, id } : p));
  };

  const handleDeleteParceiro = (id: string) => {
    setParceiros(prev => prev.filter(p => p.id !== id));
    toast({ title: "Parceiro removido com sucesso!" });
  };

  return {
    transacoes,
    custosFixos,
    parceiros,
    handleAddTransacao,
    handleUpdateTransacao,
    handleAddCusto,
    handleUpdateCusto,
    handleDeleteCusto,
    handleAddParceiro,
    handleUpdateParceiro,
    handleDeleteParceiro
  };
};
