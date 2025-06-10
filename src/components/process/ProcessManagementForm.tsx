
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ProcessForm, responsaveis } from '@/types/process';

interface ProcessManagementFormProps {
  form: UseFormReturn<ProcessForm>;
}

const ProcessManagementForm: React.FC<ProcessManagementFormProps> = ({ form }) => {
  return (
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
  );
};

export default ProcessManagementForm;
