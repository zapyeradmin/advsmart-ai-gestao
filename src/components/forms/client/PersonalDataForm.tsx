
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDataFormProps {
  control: Control<any>;
  personType: 'fisica' | 'juridica';
}

const PersonalDataForm = ({ control, personType }: PersonalDataFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">
        {personType === 'fisica' ? 'Dados Pessoais' : 'Dados da Empresa'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                {personType === 'fisica' ? 'Nome Completo' : 'Razão Social'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={personType === 'fisica' ? 'Nome completo' : 'Razão social'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {personType === 'juridica' && (
          <FormField
            control={control}
            name="fantasyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Nome Fantasia</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Nome fantasia"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                {personType === 'fisica' ? 'CPF' : 'CNPJ'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={personType === 'fisica' ? 'CPF' : 'CNPJ'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rg"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                {personType === 'fisica' ? 'RG' : 'Inscrição Estadual'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={personType === 'fisica' ? 'RG' : 'Inscrição Estadual'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {personType === 'fisica' ? (
          <>
            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Data de Nascimento</FormLabel>
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
              control={control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Estado Civil</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="uniao">União Estável</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Profissão</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Profissão"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Renda Mensal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="R$ 0,00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Data de Fundação</FormLabel>
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
              control={control}
              name="municipalRegistration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Inscrição Municipal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Inscrição Municipal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cnae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">CNAE</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="CNAE"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Porte da Empresa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mei">MEI</SelectItem>
                      <SelectItem value="micro">Microempresa</SelectItem>
                      <SelectItem value="pequena">Pequena Empresa</SelectItem>
                      <SelectItem value="media">Média Empresa</SelectItem>
                      <SelectItem value="grande">Grande Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalDataForm;
