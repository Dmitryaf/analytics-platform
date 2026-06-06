export type WidgetId = string;

export type BaseSettings = Record<string, unknown>;

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetManifest<TSettings extends BaseSettings = BaseSettings> {
  id: WidgetId;
  name: string;
  description?: string;
  defaultSettings: TSettings;
  componentsPath: string;
  defaultPosition?: WidgetPosition;
}

export interface Widget<T extends BaseSettings = BaseSettings> {
  id: WidgetId;
  manifestId: WidgetId;
  settings: T;
  position: WidgetPosition;
  createdAt: Date;
}
