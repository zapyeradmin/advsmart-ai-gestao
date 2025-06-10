
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ContactInfoFormProps {
  control: Control<any>;
}

const ContactInfoForm = ({ control }: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Informações de Contato</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="E-mail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Telefone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Telefone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Celular</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Celular"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">WhatsApp</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="WhatsApp"
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

export default ContactInfoForm;
