import { registerWidgets } from '@/modules/widgets/config/register-widgets';
import { WidgetRegistry } from '@/modules/widgets/model/widget-registry';
import { describe, expect, it } from 'vitest';

describe('registerWidgets', () => {
  it('registers built-in widgets', () => {
    const registry = new WidgetRegistry();
    registerWidgets(registry);
    expect(registry.has('commits-chart')).toBe(true);
  });
});
