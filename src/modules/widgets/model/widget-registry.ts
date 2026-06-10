import type { WidgetManifest, WidgetId } from '@/modules/widgets/model/types';

export class WidgetRegistry {
  private widgets = new Map<WidgetId, WidgetManifest>();

  register(definition: WidgetManifest) {
    if (this.widgets.has(definition.id)) {
      throw new Error(`Виджет с ID "${definition.id}" уже зарегистрирован`);
    }

    const validResult = definition.settingsSchema.safeParse(definition.defaultSettings);

    if (!validResult.success) {
      throw new Error(`Некорректные defaultSettings для виджета "${definition.id}"`);
    }

    this.widgets.set(definition.id, definition);
  }

  get(id: WidgetId): WidgetManifest | undefined {
    return this.widgets.get(id);
  }

  getAll() {
    return Array.from(this.widgets.values());
  }

  has(id: WidgetId): boolean {
    return this.widgets.has(id);
  }
}
