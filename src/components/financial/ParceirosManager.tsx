
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, Users, TrendingUp, Percent } from 'lucide-react';
import { Parceiro, parceiroSchema } from '@/types/financial';
import { useToast } from "@/hooks/use-toast";

interface ParceirosManagerProps {
  parceiros: Parceiro[];
  onAddParceiro: (parceiro: Parceiro) => void;
  onUpdateParceiro: (id: string, parceiro: Parceiro) => void;
  onDeleteParceiro: (id: string) => void;
}

const ParceirosManager: React.FC<ParceirosManagerProps> = ({
  parceiros,
  onAddParceiro,
  onUpdateParceiro,
  onDeleteParceiro
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParceiro, setEditingParceiro] = useState<Parceiro | null>(null);
  const { toast } = useToast();

  const form = useForm<Parceiro>({
    resolver: zodResolver(parceiroSchema),
    defaultValues: {
      nome: "",
      tipo: "Outros",
      contato: "",
      percentual: 0,
      valorFixo: 0,
      ltv: 0,
      ativo: true,
    },
  });

  const onSubmit = (data: Parceiro) => {
    if (editingParceiro) {
      onUpdateParceiro(editingParceiro.id!, data);
      toast({ title: "Parceiro atualizado com sucesso!" });
    } else {
      onAddParceiro({ ...data, id: Date.now().toString() });
      toast({ title: "Parceiro criado com sucesso!" });
    }
    form.reset();
    setIsModalOpen(false);
    setEditingParceiro(null);
  };

  const handleEdit = (parceiro: Parceiro) => {
    setEditingParceiro(parceiro);
    form.reset(parceiro);
    setIsModalOpen(true);
  };

  const parceirosPorTipo = parceiros.reduce((acc, parceiro) => {
    acc[parceiro.tipo] = (acc[parceiro.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const melhorLtv = parceiros.reduce((max, p) => 
    (p.ltv || 0) > (max?.ltv || 0) ? p : max, parceiros[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Gestão de Parceiros</h3>
          <p className="text-gray-400">Controle advogados parceiros, captadores e investimentos</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus size={16} className="mr-2" />
          Novo Parceiro
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{parceiros.length}</div>
                <div className="text-gray-400 text-sm">Total Parceiros</div>
              </div>
              <Users className="text-blue-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {parceiros.filter(p => p.ativo).length}
                </div>
                <div className="text-gray-400 text-sm">Ativos</div>
              </div>
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {melhorLtv?.ltv ? `R$ ${melhorLtv.ltv.toFixed(0)}` : 'N/A'}
                </div>
                <div className="text-gray-400 text-sm">Melhor LTV</div>
              </div>
              <Percent className="text-yellow-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-gray-800">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">
              {parceirosPorTipo['Advogado'] || 0}
            </div>
            <div className="text-gray-400 text-sm">Advogados Parceiros</div>
          </CardContent>
        </Card>
      </div>

      {/* Parceiros Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parceiros.map((parceiro) => (
          <Card key={parceiro.id} className="bg-dark-card border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white">{parceiro.nome}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    parceiro.tipo === 'Advogado' ? 'bg-blue-900/50 text-blue-400' :
                    parceiro.tipo === 'Captador' ? 'bg-green-900/50 text-green-400' :
                    parceiro.tipo === 'Rede Social' ? 'bg-purple-900/50 text-purple-400' :
                    parceiro.tipo === 'Anúncios' ? 'bg-orange-900/50 text-orange-400' :
                    'bg-gray-900/50 text-gray-400'
                  }`}>
                    {parceiro.tipo}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(parceiro)}
                    className="border-gray-700 text-gray-300 h-8 w-8 p-0"
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteParceiro(parceiro.id!)}
                    className="border-gray-700 text-red-400 h-8 w-8 p-0 hover:bg-red-900/20"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                {parceiro.contato && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contato:</span>
                    <span className="text-gray-300 text-sm">{parceiro.contato}</span>
                  </div>
                )}
                {parceiro.percentual && parceiro.percentual > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Percentual:</span>
                    <span className="text-yellow-400 font-medium">{parceiro.percentual}%</span>
                  </div>
                )}
                {parceiro.valorFixo && parceiro.valorFixo > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor Fixo:</span>
                    <span className="text-green-400 font-medium">
                      R$ {parceiro.valorFixo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                {parceiro.ltv && parceiro.ltv > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">LTV:</span>
                    <span className="text-purple-400 font-medium">
                      R$ {parceiro.ltv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    parceiro.ativo 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-gray-900/50 text-gray-400'
                  }`}>
                    {parceiro.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-dark-card border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingParceiro ? 'Editar Parceiro' : 'Novo Parceiro'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nome *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Nome do parceiro"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Tipo *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Advogado">Advogado</SelectItem>
                          <SelectItem value="Captador">Captador</SelectItem>
                          <SelectItem value="Rede Social">Rede Social</SelectItem>
                          <SelectItem value="Anúncios">Anúncios</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Contato</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Email, telefone ou WhatsApp"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="percentual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Percentual (%)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
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
                  name="valorFixo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Valor Fixo (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.01"
                          min="0"
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
                  name="ltv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">LTV (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.01"
                          min="0"
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
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-gray-300">Parceiro Ativo</FormLabel>
                      <div className="text-sm text-gray-400">
                        Parceiro está ativo para receber novos casos
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                  {editingParceiro ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParceirosManager;
