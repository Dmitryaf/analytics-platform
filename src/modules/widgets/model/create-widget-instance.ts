import type { WidgetInstance, WidgetManifest, WidgetPosition } from '@/modules/widgets/model/types';

export interface createWidgetInstanceParams {
  manifest: WidgetManifest;
  position: WidgetPosition;
  settingsOverrides?: Record<string, unknown>;
}

function generateInstanceId() {
  return `widget-${Date.now()}`;
}

export function createWidgetInstance({
  manifest,
  position,
  settingsOverrides = {},
}: createWidgetInstanceParams): WidgetInstance {
  const settings = {
    ...(manifest.defaultSettings as Record<string, unknown>),
    ...settingsOverrides,
  };

  const validSettings = manifest.settingsSchema.safeParse(settings);

  if (!validSettings.success) {
    throw new Error(`Некорректные настройки для экземпляра виджета "${manifest.id}"`);
  }

  return {
    instanceId: generateInstanceId(),
    widgetId: manifest.id,
    settings: validSettings.data as Record<string, unknown>,
    position,
  };
}
