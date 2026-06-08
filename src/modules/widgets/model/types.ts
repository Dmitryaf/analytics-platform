import type { Component } from 'vue';

export type WidgetId = string;

export interface WidgetDefinition {
  id: WidgetId;
  title: string;
  version: string;
  description?: string;
  defaultSettings: unknown;
  settingsSchema: unknown;
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
