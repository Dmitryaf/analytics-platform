import { commitsChartManifest } from '@/modules/widgets/config/commits-chart.manifest';
import type { WidgetRegistry } from '@/modules/widgets/model/widget-registry';

export function registerWidgets(registry: WidgetRegistry): void {
  registry.register(commitsChartManifest);
}
