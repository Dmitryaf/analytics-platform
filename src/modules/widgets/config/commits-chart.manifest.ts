import { createWidgetManifest } from '@/modules/widgets/model/create-widget-manifest';
import z from 'zod';

export const commitsChartManifest = createWidgetManifest({
  id: 'commits-chart',
  title: 'Commits Chart',
  version: '1.0.0',
  description: 'Shows repository commits analytics',
  settingsSchema: z.object({
    chartType: z.enum(['bar', 'line']),
    refreshInterval: z.number().min(5000),
  }),
  defaultSettings: {
    chartType: 'bar',
    refreshInterval: 30000,
  },
});
