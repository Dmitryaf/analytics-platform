import type { WidgetManifest } from '@/modules/widgets/model/types';
import type { ZodType } from 'zod';

export function createWidgetManifest<TSettingsSchema extends ZodType>(
  manifest: WidgetManifest<TSettingsSchema>,
): WidgetManifest<TSettingsSchema> {
  return manifest;
}
