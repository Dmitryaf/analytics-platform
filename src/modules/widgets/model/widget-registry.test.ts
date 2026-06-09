import z from 'zod';
import { describe, expect, it } from 'vitest';
import { WidgetRegistry } from '@/modules/widgets/model/widget-registry';
import type { WidgetDefinition } from '@/modules/widgets/model/types';

describe('WidgetRegistry', () => {
  it('registers widget definition', () => {
    const registry = new WidgetRegistry();
    const widgetDefinition = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
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
      settingsSchema: z.object({}),
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
      settingsSchema: z.object({}),
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
      settingsSchema: z.object({}),
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
      settingsSchema: z.object({}),
      componentLoader: async () => ({ default: {} as never }),
    };

    expect(() => {
      registry.register(widgetDefinition);
      registry.register(widgetDefinition);
    }).toThrow('Виджет с ID "commits-chart" уже зарегистрирован');
  });

  it('throws error when default settings are invalid', () => {
    const settingsSchema = z.object({
      title: z.string(),
    });
    const registry = new WidgetRegistry();
    const widgetDefinition: WidgetDefinition<typeof settingsSchema> = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {
        // @ts-expect-error проверяем runtime-валидацию Registry
        title: 123,
      },
      settingsSchema,
      componentLoader: async () => ({ default: {} as never }),
    };

    expect(() => {
      registry.register(widgetDefinition);
    }).toThrow('Некорректные defaultSettings для виджета "commits-chart"');
  });
});
