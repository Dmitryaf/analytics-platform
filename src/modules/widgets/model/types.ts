import type { z, ZodType } from 'zod';

export type WidgetId = string;

export interface WidgetManifest<TSettingsSchema extends ZodType = ZodType> {
  id: WidgetId;
  title: string;
  version: string;
  description?: string;
  defaultSettings: z.infer<TSettingsSchema>;
  settingsSchema: TSettingsSchema;
}

export interface WidgetInstance {
  instanceId: string;
  widgetId: WidgetId;
  settings: Record<string, unknown>;
  position: WidgetPosition;
}

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}
