import type { Component } from 'vue';
import type { z, ZodType } from 'zod';

export type WidgetId = string;

export interface WidgetDefinition<TSettingsSchema extends ZodType = ZodType> {
  id: WidgetId;
  title: string;
  version: string;
  description?: string;
  defaultSettings: z.infer<TSettingsSchema>;
  settingsSchema: TSettingsSchema;
  componentLoader: () => Promise<{ default: Component }>;
}

export interface WidgetInstance {
  instanceId: string;
  type: WidgetId;
  settings: Record<string, unknown>;
}

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}
