import { z } from "zod";

// Tipos de integração disponíveis
export type IntegrationType = 
  // AI Services
  | 'openai' 
  | 'grok' 
  | 'deepseek' 
  | 'gemini' 
  | 'arcee' 
  | 'openrouter'
  // Google Services
  | 'google_calendar' 
  | 'google_drive' 
  | 'google_sheets' 
  | 'gmail'
  // Other Services
  | 'notion' 
  | 'n8n' 
  | 'make' 
  | 'hubspot' 
  | 'zapier';

// Schema para campo de configuração
export const integrationFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['text', 'password', 'url', 'email', 'number', 'select', 'boolean', 'textarea']),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).optional()
});

// Schema para template de integração
export const integrationTemplateSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  fields: z.array(integrationFieldSchema),
  webhookEvents: z.array(z.string())
});

// Schema para configuração de integração
export const integrationConfigSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  active: z.boolean(),
  credentials: z.record(z.any()),
  settings: z.record(z.any()),
  createdAt: z.string(),
  lastSync: z.string().optional()
});

// Schema para webhook
export const webhookConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  events: z.array(z.string()),
  active: z.boolean(),
  secret: z.string().optional(),
  headers: z.record(z.string()).optional(),
  createdAt: z.string(),
  lastTriggered: z.string().optional()
});

// Schema para payload do webhook
export const webhookPayloadSchema = z.object({
  event: z.string(),
  timestamp: z.string(),
  data: z.any(),
  source: z.string()
});

// Tipos inferidos
export type IntegrationField = z.infer<typeof integrationFieldSchema>;
export type IntegrationTemplate = z.infer<typeof integrationTemplateSchema>;
export type IntegrationConfig = z.infer<typeof integrationConfigSchema>;
export type WebhookConfig = z.infer<typeof webhookConfigSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

// Interface para resposta de IA
export interface AIResponse {
  id: string;
  model: string;
  content: string;
  tokens: number;
  timestamp: string;
  provider: string;
}

// Interface para configuração de IA
export interface AIConfig {
  provider: IntegrationType;
  model: string;
  apiKey: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}
