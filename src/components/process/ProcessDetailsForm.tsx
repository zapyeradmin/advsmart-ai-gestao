
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ProcessForm } from '@/types/process';

interface ProcessDetailsFormProps {
  form: UseFormReturn<ProcessForm>;
}

const ProcessDetailsForm: React.FC<ProcessDetailsFormProps> = ({ form }) => {
  return (
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
  );
};

export default ProcessDetailsForm;
