
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OriginSystemFormProps {
  control: Control<any>;
}

const originOptions = [
  'Indicação de Cliente',
  'Indicação de Advogado',
  'Site/Internet',
  'Redes Sociais',
  'Marketing Digital',
  'Propaganda',
  'Evento/Palestra',
  'Busca Espontânea',
  'Outros'
];

const OriginSystemForm = ({ control }: OriginSystemFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Sistema de Origem</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Como nos conheceu?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {originOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="referredBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Quem indicou?</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Nome de quem indicou"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Data do Primeiro Contato</FormLabel>
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

export default OriginSystemForm;
