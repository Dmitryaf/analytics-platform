import { registerWidgets } from '@/modules/widgets/config/register-widgets';
import { createWidgetInstance } from '@/modules/widgets/model/create-widget-instance';
import type { WidgetManifest } from '@/modules/widgets/model/types';
import { WidgetRegistry } from '@/modules/widgets/model/widget-registry';
import { describe, expect, it } from 'vitest';

describe('createWidgetInstance', () => {
  it('creates widget instance', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    const manifest = registry.get('commits-chart') as WidgetManifest;

    const { instanceId } = createWidgetInstance({
      manifest,
      position: { x: 0, y: 0, w: 0, h: 0 },
      settingsOverrides: { commitsCount: 5 },
    });

    expect(instanceId).toMatch(/^widget-/);
  });

  it('uses default settings', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    const manifest = registry.get('commits-chart') as WidgetManifest;

    const instance = createWidgetInstance({
      manifest,
      position: { x: 0, y: 0, w: 0, h: 0 },
      settingsOverrides: {},
    });

    expect(instance.settings).toEqual(manifest.defaultSettings);
  });

  it('applies settings overrides', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    const manifest = registry.get('commits-chart') as WidgetManifest;
    const instance = createWidgetInstance({
      manifest,
      position: { x: 0, y: 0, w: 0, h: 0 },
      settingsOverrides: { refreshInterval: 10000 },
    });
    expect(instance.settings).toEqual({
      ...(manifest.defaultSettings as Record<string, unknown>),
      refreshInterval: 10000,
    });
  });

  it('throws error when settings are invalid', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    const manifest = registry.get('commits-chart') as WidgetManifest;
    expect(() => {
      createWidgetInstance({
        manifest,
        position: { x: 0, y: 0, w: 0, h: 0 },
        settingsOverrides: { chartType: 'wrong' },
      });
    }).toThrow('Некорректные настройки для экземпляра виджета commits-chart');
  });

  it('does not mutate manifest.defaultSettings ', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    const manifest = registry.get('commits-chart') as WidgetManifest;
    const originalSettings = structuredClone(manifest.defaultSettings);
    createWidgetInstance({
      manifest,
      position: { x: 0, y: 0, w: 0, h: 0 },
      settingsOverrides: {},
    });
    expect(manifest.defaultSettings).toEqual(originalSettings);
  });
});
