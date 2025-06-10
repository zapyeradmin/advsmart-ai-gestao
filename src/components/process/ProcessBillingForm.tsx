
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ProcessForm } from '@/types/process';

interface ProcessBillingFormProps {
  form: UseFormReturn<ProcessForm>;
}

const ProcessBillingForm: React.FC<ProcessBillingFormProps> = ({ form }) => {
  const watchFormaCobranca = form.watch("formaCobranca");

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
  );
};

export default ProcessBillingForm;
