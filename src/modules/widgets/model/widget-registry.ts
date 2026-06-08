import type { WidgetDefinition, WidgetId } from '@/modules/widgets/model/types';

export class widgetRegistry {
  private widgets = new Map<WidgetId, WidgetDefinition>();

  register(definition: WidgetDefinition) {
    if (this.widgets.has(definition.id)) {
      throw new Error(`Виджет с ID "${definition.id}" уже зарегистрирован`);
    }
    this.widgets.set(definition.id, definition);
  }

  get(id: WidgetId): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }

  getAll() {
    return Array.from(this.widgets.values());
  }

  has(id: WidgetId): boolean {
    return this.widgets.has(id);
  }
}
