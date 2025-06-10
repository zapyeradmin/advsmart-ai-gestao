
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ObservationsFormProps {
  control: Control<any>;
}

const ObservationsForm = ({ control }: ObservationsFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">Observações Gerais</h4>
      <FormField
        control={control}
        name="observations"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Informações adicionais sobre o cliente..."
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ObservationsForm;
