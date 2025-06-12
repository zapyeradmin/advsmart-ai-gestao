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
  Settings,
  Bot,
  Brain,
  Sparkles,
  MessageSquare,
  Cpu
} from 'lucide-react';

export const integrationTemplates: IntegrationTemplate[] = [
  // AI Services
  {
    type: 'openai',
    name: 'OpenAI',
    description: 'Integre com GPT-4, GPT-3.5 e outros modelos OpenAI',
    icon: 'Bot',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'sk-...'
      },
      {
        key: 'model',
        label: 'Modelo Padrão',
        type: 'select',
        required: false,
        placeholder: 'Selecione o modelo',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ]
      },
      {
        key: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        required: false,
        placeholder: '2048'
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.analysis_generated']
  },
  {
    type: 'grok',
    name: 'Grok (X.AI)',
    description: 'Acesse o modelo Grok da X.AI para análises avançadas',
    icon: 'Brain',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'xai-...'
      },
      {
        key: 'model',
        label: 'Modelo',
        type: 'select',
        required: false,
        placeholder: 'Selecione o modelo',
        options: [
          { value: 'grok-beta', label: 'Grok Beta' },
          { value: 'grok-vision-beta', label: 'Grok Vision Beta' }
        ]
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.analysis_generated']
  },
  {
    type: 'deepseek',
    name: 'DeepSeek',
    description: 'Utilize modelos DeepSeek para análise e geração de texto',
    icon: 'Cpu',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'sk-...'
      },
      {
        key: 'model',
        label: 'Modelo',
        type: 'select',
        required: false,
        placeholder: 'Selecione o modelo',
        options: [
          { value: 'deepseek-chat', label: 'DeepSeek Chat' },
          { value: 'deepseek-coder', label: 'DeepSeek Coder' }
        ]
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.code_generated']
  },
  {
    type: 'gemini',
    name: 'Google Gemini',
    description: 'Integre com os modelos Gemini do Google',
    icon: 'Sparkles',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'Sua Google AI API Key'
      },
      {
        key: 'model',
        label: 'Modelo',
        type: 'select',
        required: false,
        placeholder: 'Selecione o modelo',
        options: [
          { value: 'gemini-pro', label: 'Gemini Pro' },
          { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' },
          { value: 'gemini-ultra', label: 'Gemini Ultra' }
        ]
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.vision_analysis']
  },
  {
    type: 'arcee',
    name: 'Arcee AI',
    description: 'Conecte com modelos personalizados da Arcee AI',
    icon: 'MessageSquare',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'Sua Arcee API Key'
      },
      {
        key: 'modelId',
        label: 'Model ID',
        type: 'text',
        required: false,
        placeholder: 'ID do modelo personalizado'
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.custom_model_used']
  },
  {
    type: 'openrouter',
    name: 'OpenRouter',
    description: 'Acesse múltiplos modelos de IA através do OpenRouter',
    icon: 'Globe',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'sk-or-...'
      },
      {
        key: 'model',
        label: 'Modelo Preferido',
        type: 'select',
        required: false,
        placeholder: 'Selecione o modelo',
        options: [
          { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
          { value: 'openai/gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'google/gemini-pro', label: 'Gemini Pro' },
          { value: 'meta-llama/llama-2-70b-chat', label: 'Llama 2 70B' }
        ]
      },
      {
        key: 'fallbackModel',
        label: 'Modelo de Fallback',
        type: 'text',
        required: false,
        placeholder: 'Modelo alternativo'
      }
    ],
    webhookEvents: ['ai.request_completed', 'ai.model_switched']
  },
  // Google Services
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
    type: 'gmail',
    name: 'Gmail',
    description: 'Integre com Gmail para automação de emails',
    icon: 'MessageSquare',
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
        key: 'signature',
        label: 'Assinatura de Email',
        type: 'textarea',
        required: false,
        placeholder: 'Assinatura padrão dos emails'
      }
    ],
    webhookEvents: ['email.sent', 'client.contacted', 'process.notification_sent']
  },
  // Other Services
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
