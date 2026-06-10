import { createWidgetManifest } from '@/modules/widgets/model/create-widget-manifest';
import { describe, expect, it } from 'vitest';
import z from 'zod';

describe('createWidgetManifest', () => {
  it('create widget manifest with typed default settings', () => {
    const manifest = createWidgetManifest({
      id: 'commits-chart',
      title: 'Commits Chart',
      version: '1.0.0',
      settingsSchema: z.object({
        chartType: z.enum(['bar', 'line']),
        refreshInterval: z.number(),
      }),
      defaultSettings: {
        chartType: 'bar',
        refreshInterval: 30000,
      },
    });
    expect(manifest.id).toBe('commits-chart');
    expect(manifest.defaultSettings.chartType).toBe('bar');
  });
});
