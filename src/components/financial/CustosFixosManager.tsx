
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { CustoFixo, custoFixoSchema } from '@/types/financial';
import { useToast } from "@/hooks/use-toast";

interface CustosFixosManagerProps {
  custosFixos: CustoFixo[];
  onAddCusto: (custo: CustoFixo) => void;
  onUpdateCusto: (id: string, custo: CustoFixo) => void;
  onDeleteCusto: (id: string) => void;
}

const CustosFixosManager: React.FC<CustosFixosManagerProps> = ({
  custosFixos,
  onAddCusto,
  onUpdateCusto,
  onDeleteCusto
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCusto, setEditingCusto] = useState<CustoFixo | null>(null);
  const { toast } = useToast();

  const form = useForm<CustoFixo>({
    resolver: zodResolver(custoFixoSchema),
    defaultValues: {
      descricao: "",
      valor: 0,
      categoria: "Outras Despesas",
      diaVencimento: 10,
      ativo: true,
    },
  });

  const onSubmit = (data: CustoFixo) => {
    if (editingCusto) {
      onUpdateCusto(editingCusto.id!, data);
      toast({ title: "Custo fixo atualizado com sucesso!" });
    } else {
      onAddCusto({ ...data, id: Date.now().toString() });
      toast({ title: "Custo fixo criado com sucesso!" });
    }
    form.reset();
    setIsModalOpen(false);
    setEditingCusto(null);
  };

  const handleEdit = (custo: CustoFixo) => {
    setEditingCusto(custo);
    form.reset(custo);
    setIsModalOpen(true);
  };

  const totalCustosFixos = custosFixos
    .filter(c => c.ativo)
    .reduce((sum, c) => sum + c.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Custos Fixos</h3>
          <p className="text-gray-400">Gerenciar despesas mensais recorrentes</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus size={16} className="mr-2" />
          Novo Custo Fixo
        </Button>
      </div>

      <Card className="bg-dark-card border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <DollarSign className="mr-2 text-red-400" size={20} />
              Total Mensal
            </CardTitle>
            <span className="text-2xl font-bold text-red-400">
              R$ {totalCustosFixos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {custosFixos.map((custo) => (
          <Card key={custo.id} className="bg-dark-card border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-white">{custo.descricao}</h4>
                  <span className="text-sm text-blue-400">{custo.categoria}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(custo)}
                    className="border-gray-700 text-gray-300 h-8 w-8 p-0"
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteCusto(custo.id!)}
                    className="border-gray-700 text-red-400 h-8 w-8 p-0 hover:bg-red-900/20"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor:</span>
                  <span className="text-red-400 font-medium">
                    R$ {custo.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Vencimento:</span>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={12} className="mr-1" />
                    Dia {custo.diaVencimento}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    custo.ativo 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-gray-900/50 text-gray-400'
                  }`}>
                    {custo.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-dark-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingCusto ? 'Editar Custo Fixo' : 'Novo Custo Fixo'}
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
                        placeholder="Ex: Aluguel do escritório"
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
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Aluguel">Aluguel</SelectItem>
                          <SelectItem value="Advogado Fixo">Advogado Fixo</SelectItem>
                          <SelectItem value="Estagiários">Estagiários</SelectItem>
                          <SelectItem value="Impostos Patronais">Impostos Patronais</SelectItem>
                          <SelectItem value="Internet">Internet</SelectItem>
                          <SelectItem value="Energia">Energia</SelectItem>
                          <SelectItem value="Água">Água</SelectItem>
                          <SelectItem value="Contador">Contador</SelectItem>
                          <SelectItem value="Impostos">Impostos</SelectItem>
                          <SelectItem value="Outras Despesas">Outras Despesas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </div>

              <FormField
                control={form.control}
                name="diaVencimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Dia do Vencimento *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min="1"
                        max="31"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 10)}
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
                  {editingCusto ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustosFixosManager;
