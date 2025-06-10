
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

const ClientModal = ({ isOpen, onClose, onSave }: ClientModalProps) => {
  const [personType, setPersonType] = useState('fisica');
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: '',
    document: '',
    rg: '',
    birthDate: '',
    maritalStatus: '',
    profession: '',
    income: '',
    
    // Contato
    email: '',
    phone: '',
    mobile: '',
    whatsapp: '',
    
    // Endereço
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',
    
    // Sistema de Origem
    origin: '',
    referredBy: '',
    originDate: '',
    originNotes: '',
    
    // Informações Profissionais (para PJ)
    companyName: '',
    fantasyName: '',
    stateRegistration: '',
    municipalRegistration: '',
    cnae: '',
    companySize: '',
    
    // Contato Responsável (para PJ)
    responsibleName: '',
    responsibleRole: '',
    responsibleEmail: '',
    responsiblePhone: '',
    
    // Observações e Status
    observations: '',
    status: 'ativo',
    priority: 'normal',
    tags: '',
    
    // Dados Bancários
    bankName: '',
    agency: '',
    account: '',
    pixKey: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, personType });
    onClose();
  };

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

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content max-h-[90vh] overflow-y-auto max-w-4xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Novo Cliente</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Tipo de Pessoa */}
            <div className="mb-6">
              <Label className="text-gray-400 mb-2 block">Tipo de Pessoa</Label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="personType"
                    value="fisica"
                    checked={personType === 'fisica'}
                    onChange={(e) => setPersonType(e.target.value)}
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
                    onChange={(e) => setPersonType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Pessoa Jurídica</span>
                </label>
              </div>
            </div>

            {/* Dados Pessoais/Empresariais */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">
                {personType === 'fisica' ? 'Dados Pessoais' : 'Dados da Empresa'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">
                    {personType === 'fisica' ? 'Nome Completo' : 'Razão Social'}
                  </Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                {personType === 'juridica' && (
                  <div>
                    <Label className="text-gray-400">Nome Fantasia</Label>
                    <Input
                      type="text"
                      value={formData.fantasyName}
                      onChange={(e) => setFormData({ ...formData, fantasyName: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-gray-400">
                    {personType === 'fisica' ? 'CPF' : 'CNPJ'}
                  </Label>
                  <Input
                    type="text"
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-400">
                    {personType === 'fisica' ? 'RG' : 'Inscrição Estadual'}
                  </Label>
                  <Input
                    type="text"
                    value={formData.rg}
                    onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {personType === 'fisica' ? (
                  <>
                    <div>
                      <Label className="text-gray-400">Data de Nascimento</Label>
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400">Estado Civil</Label>
                      <Select
                        value={formData.maritalStatus}
                        onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                          <SelectItem value="uniao">União Estável</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-400">Profissão</Label>
                      <Input
                        type="text"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400">Renda Mensal</Label>
                      <Input
                        type="text"
                        value={formData.income}
                        onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="R$ 0,00"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="text-gray-400">Data de Fundação</Label>
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400">Inscrição Municipal</Label>
                      <Input
                        type="text"
                        value={formData.municipalRegistration}
                        onChange={(e) => setFormData({ ...formData, municipalRegistration: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400">CNAE</Label>
                      <Input
                        type="text"
                        value={formData.cnae}
                        onChange={(e) => setFormData({ ...formData, cnae: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-400">Porte da Empresa</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mei">MEI</SelectItem>
                          <SelectItem value="micro">Microempresa</SelectItem>
                          <SelectItem value="pequena">Pequena Empresa</SelectItem>
                          <SelectItem value="media">Média Empresa</SelectItem>
                          <SelectItem value="grande">Grande Empresa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Contato Responsável (apenas para PJ) */}
            {personType === 'juridica' && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-white mb-4">Contato Responsável</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Nome do Responsável</Label>
                    <Input
                      type="text"
                      value={formData.responsibleName}
                      onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-400">Cargo</Label>
                    <Input
                      type="text"
                      value={formData.responsibleRole}
                      onChange={(e) => setFormData({ ...formData, responsibleRole: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-400">E-mail do Responsável</Label>
                    <Input
                      type="email"
                      value={formData.responsibleEmail}
                      onChange={(e) => setFormData({ ...formData, responsibleEmail: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-400">Telefone do Responsável</Label>
                    <Input
                      type="tel"
                      value={formData.responsiblePhone}
                      onChange={(e) => setFormData({ ...formData, responsiblePhone: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contato */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Informações de Contato</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">E-mail</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Telefone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Celular</Label>
                  <Input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">WhatsApp</Label>
                  <Input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Endereço</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">CEP</Label>
                  <Input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Logradouro</Label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Número</Label>
                  <Input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Complemento</Label>
                  <Input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Bairro</Label>
                  <Input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Cidade</Label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Estado</Label>
                  <Input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">País</Label>
                  <Input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Sistema de Origem */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Sistema de Origem</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Como nos conheceu?</Label>
                  <Select
                    value={formData.origin}
                    onValueChange={(value) => setFormData({ ...formData, origin: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {originOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-400">Quem indicou? (Nome)</Label>
                  <Input
                    type="text"
                    value={formData.referredBy}
                    onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Nome de quem indicou"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Data do Primeiro Contato</Label>
                  <Input
                    type="date"
                    value={formData.originDate}
                    onChange={(e) => setFormData({ ...formData, originDate: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Observações da Origem</Label>
                  <Textarea
                    value={formData.originNotes}
                    onChange={(e) => setFormData({ ...formData, originNotes: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Detalhes sobre como chegou até nós"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Dados Bancários */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Dados Bancários</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Banco</Label>
                  <Input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Agência</Label>
                  <Input
                    type="text"
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Conta</Label>
                  <Input
                    type="text"
                    value={formData.account}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Chave PIX</Label>
                  <Input
                    type="text"
                    value={formData.pixKey}
                    onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="CPF, E-mail, Telefone ou Chave Aleatória"
                  />
                </div>
              </div>
            </div>

            {/* Status e Configurações */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Status e Configurações</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Status do Cliente</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="prospecto">Prospecto</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-400">Prioridade</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-gray-400">Tags (separadas por vírgula)</Label>
                  <Input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Ex: VIP, Trabalhista, Previdenciário"
                  />
                </div>
              </div>
            </div>

            {/* Observações Gerais */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-4">Observações Gerais</h4>
              <Textarea
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Informações adicionais sobre o cliente..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
