import type { WidgetId, WidgetManifest } from '@/types/widget.types';
import type { Component } from 'vue';

export class WidgetRegistry {
  private widgets = new Map<WidgetId, { manifest: WidgetManifest; component: Component }>();

  register<TManifest extends WidgetManifest>(manifest: TManifest, component: Component): void {
    if (this.widgets.has(manifest.id)) {
      throw new Error(`Виджет с ID {manifest.id} уже зарегистрирован в системе`);
    }
    this.widgets.set(manifest.id, { manifest, component });
  }

  getManifest(id: WidgetId): WidgetManifest | undefined {
    return this.widgets.get(id)?.manifest;
  }

  getComponent(id: WidgetId): Component | undefined {
    return this.widgets.get(id)?.component;
  }

  has(id: WidgetId): boolean {
    return this.widgets.has(id);
  }

  getAll(): Array<{ manifest: WidgetManifest; component: Component } | []> {
    return Array.from(this.widgets.values());
  }
}

export const widgetRegistry = new WidgetRegistry();
