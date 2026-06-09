import { WidgetRegistry } from '@/modules/widgets/model/widget-registry';
import { describe, expect, it } from 'vitest';

describe('WidgetRegistry', () => {
  it('registers widget definition', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: {},
      componentLoader: async () => ({ default: {} as never }),
    };

    registry.register(widgetDefinition);

    expect(registry.has('commits-chart')).toBe(true);
  });

  it('returns widget by id', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: {},
      componentLoader: async () => ({ default: {} as never }),
    };

    registry.register(widgetDefinition);

    expect(registry.get('commits-chart')).toBe(widgetDefinition);
  });

  it('returns all registered widgets', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: {},
      componentLoader: async () => ({ default: {} as never }),
    };

    registry.register(widgetDefinition);

    const widget = registry.getAll();

    expect(widget).toEqual([widgetDefinition]);
  });

  it('checks if widget exists', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: {},
      componentLoader: async () => ({ default: {} as never }),
    };

    registry.register(widgetDefinition);

    expect(registry.has('commits-chart')).toBe(true);
  });

  it('throws error when widget id is duplicated', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: {},
      componentLoader: async () => ({ default: {} as never }),
    };

    expect(() => {
      registry.register(widgetDefinition);
      registry.register(widgetDefinition);
    }).toThrow('Виджет с ID "commits-chart" уже зарегистрирован');
  });
});
