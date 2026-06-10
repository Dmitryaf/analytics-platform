import z from 'zod';
import { describe, expect, it } from 'vitest';
import { WidgetRegistry } from '@/modules/widgets/model/widget-registry';
import type { WidgetManifest } from '@/modules/widgets/model/types';

describe('WidgetRegistry', () => {
  it('registers widget definition', () => {
    const registry = new WidgetRegistry();
    const WidgetManifest = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
    };

    registry.register(WidgetManifest);

    expect(registry.has('commits-chart')).toBe(true);
  });

  it('returns widget by id', () => {
    const registry = new WidgetRegistry();
    const WidgetManifest = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
    };

    registry.register(WidgetManifest);

    expect(registry.get('commits-chart')).toBe(WidgetManifest);
  });

  it('returns all registered widgets', () => {
    const registry = new WidgetRegistry();
    const WidgetManifest = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
    };

    registry.register(WidgetManifest);

    const widget = registry.getAll();

    expect(widget).toEqual([WidgetManifest]);
  });

  it('checks if widget exists', () => {
    const registry = new WidgetRegistry();
    const WidgetManifest = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
    };

    registry.register(WidgetManifest);

    expect(registry.has('commits-chart')).toBe(true);
  });

  it('throws error when widget id is duplicated', () => {
    const registry = new WidgetRegistry();
    const WidgetManifest = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {},
      settingsSchema: z.object({}),
    };

    expect(() => {
      registry.register(WidgetManifest);
      registry.register(WidgetManifest);
    }).toThrow('Виджет с ID "commits-chart" уже зарегистрирован');
  });

  it('throws error when default settings are invalid', () => {
    const settingsSchema = z.object({
      title: z.string(),
    });
    const registry = new WidgetRegistry();
    const WidgetManifest: WidgetManifest<typeof settingsSchema> = {
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      defaultSettings: {
        // @ts-expect-error проверяем runtime-валидацию Registry
        title: 123,
      },
      settingsSchema,
    };

    expect(() => {
      registry.register(WidgetManifest);
    }).toThrow('Некорректные defaultSettings для виджета "commits-chart"');
  });
});
