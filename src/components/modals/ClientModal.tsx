
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

const formSchema = z.object({
  personType: z.enum(['fisica', 'juridica']),
  name: z.string().min(1, "Nome é obrigatório"),
  document: z.string().min(1, "Documento é obrigatório"),
  email: z.string().email("Email inválido"),
  // ... outros campos opcionais
  fantasyName: z.string().optional(),
  rg: z.string().optional(),
  birthDate: z.string().optional(),
  maritalStatus: z.string().optional(),
  profession: z.string().optional(),
  income: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  whatsapp: z.string().optional(),
  zipCode: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default('Brasil'),
  origin: z.string().optional(),
  referredBy: z.string().optional(),
  originDate: z.string().optional(),
  originNotes: z.string().optional(),
  companyName: z.string().optional(),
  stateRegistration: z.string().optional(),
  municipalRegistration: z.string().optional(),
  cnae: z.string().optional(),
  companySize: z.string().optional(),
  responsibleName: z.string().optional(),
  responsibleRole: z.string().optional(),
  responsibleEmail: z.string().optional(),
  responsiblePhone: z.string().optional(),
  observations: z.string().optional(),
  status: z.string().default('ativo'),
  priority: z.string().default('normal'),
  tags: z.string().optional(),
  bankName: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  pixKey: z.string().optional(),
});

const ClientModal = ({ isOpen, onClose, onSave }: ClientModalProps) => {
  const [personType, setPersonType] = useState<'fisica' | 'juridica'>('fisica');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personType: 'fisica',
      name: '',
      document: '',
      email: '',
      country: 'Brasil',
      status: 'ativo',
      priority: 'normal',
    },
  });

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({ ...values, personType });
    onClose();
    form.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Novo Cliente</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Tipo de Pessoa */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Tipo de Pessoa</h4>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="personType"
                      value="fisica"
                      checked={personType === 'fisica'}
                      onChange={(e) => setPersonType(e.target.value as 'fisica' | 'juridica')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Pessoa Física</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="personType"
                      value="juridica"
                      checked={personType === 'juridica'}
                      onChange={(e) => setPersonType(e.target.value as 'fisica' | 'juridica')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Pessoa Jurídica</span>
                  </label>
                </div>
              </div>

              {/* Dados Pessoais/Empresariais */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">
                  {personType === 'fisica' ? 'Dados Pessoais' : 'Dados da Empresa'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                      control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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

              {/* Contato Responsável - apenas para PJ */}
              {personType === 'juridica' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Contato Responsável</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
              )}

              {/* Informações de Contato */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Informações de Contato</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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

              {/* Sistema de Origem */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Sistema de Origem</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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

              {/* Status e Configurações */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Status e Configurações</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Status do Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="inativo">Inativo</SelectItem>
                            <SelectItem value="prospecto">Prospecto</SelectItem>
                            <SelectItem value="suspenso">Suspenso</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Prioridade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="baixa">Baixa</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-400">Tags (separadas por vírgula)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Ex: VIP, Trabalhista, Previdenciário"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Observações Gerais */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Observações Gerais</h4>
                <FormField
                  control={form.control}
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

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  Salvar Cliente
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
