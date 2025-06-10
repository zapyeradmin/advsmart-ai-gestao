
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ProcessForm, clientes } from '@/types/process';

interface ProcessIdentificationFormProps {
  form: UseFormReturn<ProcessForm>;
}

const ProcessIdentificationForm: React.FC<ProcessIdentificationFormProps> = ({ form }) => {
  return (
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
  );
};

export default ProcessIdentificationForm;
