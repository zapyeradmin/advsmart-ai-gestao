
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Calendar, DollarSign, AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { Transacao, transacaoSchema } from '@/types/financial';
import { useToast } from "@/hooks/use-toast";

interface ContasManagerProps {
  transacoes: Transacao[];
  onAddTransacao: (transacao: Transacao) => void;
  onUpdateTransacao: (id: string, transacao: Transacao) => void;
}

const ContasManager: React.FC<ContasManagerProps> = ({
  transacoes,
  onAddTransacao,
  onUpdateTransacao
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'receita' | 'despesa'>('receita');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const form = useForm<Transacao>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      tipo: "Receita",
      descricao: "",
      valor: 0,
      data: new Date().toISOString().split('T')[0],
      dataVencimento: "",
      categoria: "",
      status: "Pendente",
      cliente: "",
      observacoes: "",
    },
  });

  const onSubmit = (data: Transacao) => {
    onAddTransacao({ ...data, id: Date.now().toString() });
    toast({ title: `${data.tipo} adicionada com sucesso!` });
    form.reset();
    setIsModalOpen(false);
  };

  const openModal = (tipo: 'receita' | 'despesa') => {
    setModalType(tipo);
    form.reset({
      ...form.getValues(),
      tipo: tipo === 'receita' ? 'Receita' : 'Despesa'
    });
    setIsModalOpen(true);
  };

  const contasAReceber = transacoes.filter(t => 
    t.tipo === 'Receita' && t.status === 'Pendente'
  );

  const contasAPagar = transacoes.filter(t => 
    t.tipo === 'Despesa' && t.status === 'Pendente'
  );

  const contasVencidas = transacoes.filter(t => {
    if (!t.dataVencimento || t.status === 'Pago') return false;
    return new Date(t.dataVencimento) < new Date();
  });

  const totalAReceber = contasAReceber.reduce((sum, t) => sum + t.valor, 0);
  const totalAPagar = contasAPagar.reduce((sum, t) => sum + t.valor, 0);
  const saldoProjetado = totalAReceber - totalAPagar;

  const filteredTransacoes = transacoes.filter(t =>
    t.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.cliente && t.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const marcarComoPago = (transacao: Transacao) => {
    const updated = { ...transacao, status: 'Pago' as const };
    onUpdateTransacao(transacao.id!, updated);
    toast({ title: "Transação marcada como paga!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Controle de Contas</h3>
          <p className="text-gray-400">Gestão de contas a receber e a pagar</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => openModal('receita')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus size={16} className="mr-2" />
            Conta a Receber
          </Button>
          <Button
            onClick={() => openModal('despesa')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus size={16} className="mr-2" />
            Conta a Pagar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  R$ {totalAReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">A Receber</div>
              </div>
              <DollarSign className="text-green-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-400">
                  R$ {totalAPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">A Pagar</div>
              </div>
              <DollarSign className="text-red-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${saldoProjetado >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  R$ {saldoProjetado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-400 text-sm">Saldo Projetado</div>
              </div>
              <DollarSign className={saldoProjetado >= 0 ? 'text-green-400' : 'text-red-400'} size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-400">{contasVencidas.length}</div>
                <div className="text-gray-400 text-sm">Vencidas</div>
              </div>
              <AlertCircle className="text-orange-400" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="todas" className="text-gray-300">Todas</TabsTrigger>
          <TabsTrigger value="receber" className="text-gray-300">A Receber</TabsTrigger>
          <TabsTrigger value="pagar" className="text-gray-300">A Pagar</TabsTrigger>
          <TabsTrigger value="vencidas" className="text-gray-300">Vencidas</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <TransacoesList 
            transacoes={filteredTransacoes}
            onMarcarPago={marcarComoPago}
          />
        </TabsContent>

        <TabsContent value="receber" className="space-y-4">
          <TransacoesList 
            transacoes={contasAReceber.filter(t =>
              t.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (t.cliente && t.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
            )}
            onMarcarPago={marcarComoPago}
          />
        </TabsContent>

        <TabsContent value="pagar" className="space-y-4">
          <TransacoesList 
            transacoes={contasAPagar.filter(t =>
              t.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (t.cliente && t.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
            )}
            onMarcarPago={marcarComoPago}
          />
        </TabsContent>

        <TabsContent value="vencidas" className="space-y-4">
          <TransacoesList 
            transacoes={contasVencidas.filter(t =>
              t.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (t.cliente && t.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
            )}
            onMarcarPago={marcarComoPago}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-dark-card border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Nova {modalType === 'receita' ? 'Conta a Receber' : 'Conta a Pagar'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Descrição *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Descrição da transação"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Valor (R$) *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.01"
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Categoria *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Honorários, Aluguel..."
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Data *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="date"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataVencimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Data de Vencimento</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="date"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Cliente</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Nome do cliente (se aplicável)"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Observações adicionais..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="border-gray-700 text-gray-300"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TransacoesListProps {
  transacoes: Transacao[];
  onMarcarPago: (transacao: Transacao) => void;
}

const TransacoesList: React.FC<TransacoesListProps> = ({ transacoes, onMarcarPago }) => {
  if (transacoes.length === 0) {
    return (
      <Card className="bg-dark-card border-gray-800">
        <CardContent className="p-8 text-center">
          <p className="text-gray-400">Nenhuma transação encontrada</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {transacoes.map((transacao) => (
        <Card key={transacao.id} className="bg-dark-card border-gray-800 hover:border-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-white">{transacao.descricao}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transacao.tipo === 'Receita' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {transacao.tipo}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transacao.status === 'Pago' 
                      ? 'bg-green-900/50 text-green-400' 
                      : transacao.status === 'Vencido'
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {transacao.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Valor:</span>
                    <div className={`font-medium ${
                      transacao.tipo === 'Receita' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Data:</span>
                    <div className="text-gray-300 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  {transacao.dataVencimento && (
                    <div>
                      <span className="text-gray-400">Vencimento:</span>
                      <div className="text-gray-300 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {new Date(transacao.dataVencimento).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Categoria:</span>
                    <div className="text-blue-400">{transacao.categoria}</div>
                  </div>
                </div>

                {transacao.cliente && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Cliente:</span>
                    <span className="text-gray-300 ml-2">{transacao.cliente}</span>
                  </div>
                )}
              </div>

              {transacao.status === 'Pendente' && (
                <Button
                  onClick={() => onMarcarPago(transacao)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle size={14} className="mr-1" />
                  Marcar como Pago
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContasManager;
