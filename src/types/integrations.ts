
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  secret?: string;
  headers?: Record<string, string>;
  createdAt: string;
  lastTriggered?: string;
}

export interface IntegrationConfig {
  id: string;
  type: IntegrationType;
  name: string;
  active: boolean;
  credentials: Record<string, any>;
  settings: Record<string, any>;
  createdAt: string;
  lastSync?: string;
}

export type IntegrationType = 
  | 'google_calendar'
  | 'google_drive'
  | 'google_docs'
  | 'google_sheets'
  | 'notion'
  | 'n8n'
  | 'make'
  | 'hubspot'
  | 'zapier'
  | 'webhook'
  | 'api';

export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: any;
  source: string;
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  active: boolean;
  requiresAuth: boolean;
  rateLimit?: number;
}

export interface IntegrationTemplate {
  type: IntegrationType;
  name: string;
  description: string;
  icon: string;
  fields: IntegrationField[];
  webhookEvents?: string[];
}

export interface IntegrationField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select' | 'boolean';
  required: boolean;
  options?: { value: string; label: string; }[];
  placeholder?: string;
}
