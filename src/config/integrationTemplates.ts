
import { IntegrationTemplate } from '@/types/integrations';
import { 
  Calendar, 
  FileText, 
  Sheet, 
  Database, 
  Workflow, 
  Users, 
  Globe,
  Zap,
  Settings
} from 'lucide-react';

export const integrationTemplates: IntegrationTemplate[] = [
  {
    type: 'google_calendar',
    name: 'Google Calendar',
    description: 'Sincronize prazos e audiências com o Google Calendar',
    icon: 'Calendar',
    fields: [
      {
        key: 'clientId',
        label: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'Seu Google Client ID'
      },
      {
        key: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true,
        placeholder: 'Seu Google Client Secret'
      },
      {
        key: 'calendarId',
        label: 'Calendar ID',
        type: 'text',
        required: false,
        placeholder: 'ID do calendário (opcional)'
      }
    ],
    webhookEvents: ['process.deadline_approaching', 'process.status_changed']
  },
  {
    type: 'google_drive',
    name: 'Google Drive',
    description: 'Armazene e organize documentos no Google Drive',
    icon: 'FileText',
    fields: [
      {
        key: 'clientId',
        label: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'Seu Google Client ID'
      },
      {
        key: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true,
        placeholder: 'Seu Google Client Secret'
      },
      {
        key: 'folderId',
        label: 'Folder ID',
        type: 'text',
        required: false,
        placeholder: 'ID da pasta principal (opcional)'
      }
    ],
    webhookEvents: ['document.uploaded', 'document.shared']
  },
  {
    type: 'google_sheets',
    name: 'Google Sheets',
    description: 'Exporte relatórios e dados para planilhas',
    icon: 'Sheet',
    fields: [
      {
        key: 'clientId',
        label: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'Seu Google Client ID'
      },
      {
        key: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true,
        placeholder: 'Seu Google Client Secret'
      },
      {
        key: 'spreadsheetId',
        label: 'Spreadsheet ID',
        type: 'text',
        required: false,
        placeholder: 'ID da planilha principal'
      }
    ],
    webhookEvents: ['client.created', 'process.created', 'financial.transaction_created']
  },
  {
    type: 'notion',
    name: 'Notion',
    description: 'Integre com databases e páginas do Notion',
    icon: 'Database',
    fields: [
      {
        key: 'apiKey',
        label: 'Integration Token',
        type: 'password',
        required: true,
        placeholder: 'Seu Notion Integration Token'
      },
      {
        key: 'databaseId',
        label: 'Database ID',
        type: 'text',
        required: false,
        placeholder: 'ID do database principal'
      }
    ],
    webhookEvents: ['client.created', 'process.created', 'process.status_changed']
  },
  {
    type: 'n8n',
    name: 'n8n',
    description: 'Conecte com workflows do n8n',
    icon: 'Workflow',
    fields: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'url',
        required: true,
        placeholder: 'https://seu-n8n.com/webhook/...'
      },
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: false,
        placeholder: 'API Key (opcional)'
      }
    ],
    webhookEvents: ['client.created', 'process.created', 'financial.payment_received']
  },
  {
    type: 'make',
    name: 'Make (Integromat)',
    description: 'Automatize com cenários do Make',
    icon: 'Settings',
    fields: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'url',
        required: true,
        placeholder: 'https://hook.integromat.com/...'
      },
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: false,
        placeholder: 'API Key (opcional)'
      }
    ],
    webhookEvents: ['client.created', 'process.created', 'financial.payment_received']
  },
  {
    type: 'hubspot',
    name: 'HubSpot',
    description: 'Sincronize clientes e contatos com HubSpot',
    icon: 'Users',
    fields: [
      {
        key: 'apiKey',
        label: 'Private App Token',
        type: 'password',
        required: true,
        placeholder: 'Seu HubSpot Private App Token'
      },
      {
        key: 'portalId',
        label: 'Portal ID',
        type: 'text',
        required: true,
        placeholder: 'ID do seu portal HubSpot'
      }
    ],
    webhookEvents: ['client.created', 'client.updated', 'process.created']
  },
  {
    type: 'zapier',
    name: 'Zapier',
    description: 'Conecte com milhares de apps via Zapier',
    icon: 'Zap',
    fields: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'url',
        required: true,
        placeholder: 'https://hooks.zapier.com/hooks/catch/...'
      }
    ],
    webhookEvents: ['client.created', 'process.created', 'financial.payment_received']
  }
];
