import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const processSchema = z.object({
  numero: z.string().min(1, "Número do processo é obrigatório"),
  clienteId: z.string().min(1, "Cliente é obrigatório"),
  area: z.string().min(1, "Área jurídica é obrigatória"),
  instancia: z.string().min(1, "Instância é obrigatória"),
  comarca: z.string().min(1, "Comarca é obrigatória"),
  vara: z.string().optional(),
  assunto: z.string().min(1, "Assunto é obrigatório"),
  valorCausa: z.string().optional(),
  dataDistribuicao: z.string().min(1, "Data de distribuição é obrigatória"),
  dataAudiencia: z.string().optional(),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  urgencia: z.string().min(1, "Urgência é obrigatória"),
  observacoes: z.string().optional(),
  formaCobranca: z.string().min(1, "Forma de cobrança é obrigatória"),
  valorFixo: z.string().optional(),
  percentualExito: z.string().optional(),
  valorEntrada: z.string().optional(),
  valorAtosProcessuais: z.string().optional(),
  modoPagamento: z.string().optional(),
  numParcelas: z.string().optional(),
});

type ProcessForm = z.infer<typeof processSchema>;

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (processData: ProcessForm) => void;
}

const ProcessModal: React.FC<ProcessModalProps> = ({ isOpen, onClose, onSave }) => {
  const { toast } = useToast();
  
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

  const watchFormaCobranca = form.watch("formaCobranca");

  const onSubmit = (data: ProcessForm) => {
    onSave(data);
    form.reset();
    onClose();
  };

  const clientes = [
    { id: "1", nome: "Maria Silva Santos" },
    { id: "2", nome: "Empresa ABC Ltda." },
    { id: "3", nome: "João Carlos Mendes" },
  ];

  const responsaveis = [
    "Dr. Ricardo Oliveira",
    "Dra. Camila Santos", 
    "Dra. Ana Paula Lima"
  ];

  const getPaymentModes = () => {
    switch (watchFormaCobranca) {
      case 'exito':
        return [
          { value: 'pos-recebimento', label: 'Após recebimento do valor' },
          { value: 'pos-sentenca', label: 'Após sentença favorável' }
        ];
      case 'fixo':
        return [
          { value: 'vista', label: 'À vista' },
          { value: 'parcelado', label: 'Parcelado' },
          { value: 'mensal', label: 'Mensal durante o processo' }
        ];
      case 'atos-processuais':
        return [
          { value: 'por-ato', label: 'Pagamento por ato realizado' },
          { value: 'mensal-atos', label: 'Mensal conforme atos' }
        ];
      case 'misto':
        return [
          { value: 'entrada-exito', label: 'Entrada + % no êxito' },
          { value: 'fixo-exito', label: 'Valor fixo + % no êxito' },
          { value: 'parcelado-exito', label: 'Parcelado + % no êxito' }
        ];
      default:
        return [];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Novo Processo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Identificação do Processo */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                Identificação do Processo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Número do Processo *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="0000000-00.2024.0.00.0000"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clienteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Cliente *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="">Selecione o cliente</option>
                          {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                              {cliente.nome}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Área Jurídica *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="">Selecione a área</option>
                          <option value="Trabalhista">Trabalhista</option>
                          <option value="Cível">Cível</option>
                          <option value="Criminal">Criminal</option>
                          <option value="Empresarial">Empresarial</option>
                          <option value="Tributário">Tributário</option>
                          <option value="Previdenciário">Previdenciário</option>
                          <option value="Família">Família</option>
                          <option value="Consumidor">Consumidor</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instancia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Instância *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="">Selecione a instância</option>
                          <option value="1ª Instância">1ª Instância</option>
                          <option value="2ª Instância">2ª Instância</option>
                          <option value="Superior">Superior</option>
                          <option value="Supremo">Supremo</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comarca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Comarca *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: São Paulo"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vara"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Vara</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: 1ª Vara Cível"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valorCausa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Valor da Causa</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="R$ 0,00"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detalhes do Processo */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                Detalhes do Processo
              </h3>
              
              <FormField
                control={form.control}
                name="assunto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Assunto *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Descreva o assunto principal do processo"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataDistribuicao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Data de Distribuição *</FormLabel>
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
                  name="dataAudiencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Data da Próxima Audiência</FormLabel>
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
            </div>

            {/* Formas de Cobrança */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                Formas de Cobrança
              </h3>
              
              <FormField
                control={form.control}
                name="formaCobranca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Forma de Cobrança *</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                      >
                        <option value="">Selecione a forma de cobrança</option>
                        <option value="exito">Cobrança por Êxito</option>
                        <option value="fixo">Cobrança Fixa</option>
                        <option value="atos-processuais">Por Ato Processual</option>
                        <option value="misto">Misto (Fixo + Êxito)</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campos específicos por forma de cobrança */}
              {watchFormaCobranca === 'exito' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="percentualExito"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Percentual de Êxito (%)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Ex: 20"
                            type="number"
                            min="1"
                            max="50"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchFormaCobranca === 'fixo' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="valorFixo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Valor Fixo</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="R$ 0,00"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchFormaCobranca === 'atos-processuais' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="valorAtosProcessuais"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Valor por Ato Processual</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="R$ 0,00"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchFormaCobranca === 'misto' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="valorEntrada"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Valor de Entrada</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="R$ 0,00"
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
                        <FormLabel className="text-gray-300">Valor Fixo (Opcional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="R$ 0,00"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="percentualExito"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">% de Êxito</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Ex: 15"
                            type="number"
                            min="1"
                            max="30"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Modo de Pagamento */}
              {watchFormaCobranca && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="modoPagamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Modo de Pagamento</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                          >
                            <option value="">Selecione o modo de pagamento</option>
                            {getPaymentModes().map((mode) => (
                              <option key={mode.value} value={mode.value}>
                                {mode.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(form.watch("modoPagamento") === 'parcelado' || 
                    form.watch("modoPagamento") === 'parcelado-exito') && (
                    <FormField
                      control={form.control}
                      name="numParcelas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Número de Parcelas</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Ex: 12"
                              type="number"
                              min="2"
                              max="60"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Gestão e Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                Gestão e Status
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Responsável *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="">Selecione o responsável</option>
                          {responsaveis.map((responsavel) => (
                            <option key={responsavel} value={responsavel}>
                              {responsavel}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Status *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="Em Andamento">Em Andamento</option>
                          <option value="Aguardando">Aguardando</option>
                          <option value="Suspenso">Suspenso</option>
                          <option value="Finalizado">Finalizado</option>
                          <option value="Arquivado">Arquivado</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Urgência *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                        >
                          <option value="Baixa">Baixa</option>
                          <option value="Normal">Normal</option>
                          <option value="Alta">Alta</option>
                          <option value="Urgente">Urgente</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Observações</FormLabel>
                    <FormControl>
                      <textarea 
                        {...field}
                        rows={3}
                        placeholder="Observações adicionais sobre o processo"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
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
