
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ResponsibleContactFormProps {
  control: Control<any>;
}

const ResponsibleContactForm = ({ control }: ResponsibleContactFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Contato Responsável</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="responsibleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Nome do Responsável</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Nome do responsável"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responsibleRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Cargo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Cargo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responsibleEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">E-mail do Responsável</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="E-mail do responsável"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responsiblePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Telefone do Responsável</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Telefone do responsável"
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

export default ResponsibleContactForm;
