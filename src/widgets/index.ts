import { widgetRegistry } from '@/registry/widgetRegistry';
import type { WidgetManifest } from '@/types/widget.types';
import RepoListWidget from '@/widgets/RepoListWidget.vue';

const repoListManifest: WidgetManifest = {
  id: 'repo-list',
  name: 'Список репозиториев',
  description: 'Показывает список репозиториев с GitHub',
  defaultSettings: {
    title: 'Мои репозитории',
    repoCount: 5,
  },
  componentsPath: 'RepoListWidget.vue',
  defaultPosition: { x: 0, y: 0, w: 2, h: 2 },
};

widgetRegistry.register(repoListManifest, RepoListWidget);
