<script setup lang="ts">
import { ref } from 'vue';
import type { Widget } from '@/types/widget.types';
import { widgetRegistry } from '@/registry/widgetRegistry';

// TODO: Заглушка
const widgets = ref<Widget[]>([
  {
    id: '1',
    manifestId: 'repo-list',
    settings: { title: 'Мои репозитории', repoCount: 5 },
    position: { x: 0, y: 0, w: 2, h: 2 },
    createdAt: new Date(),
  },
]);

const getWidgetComponent = (manifestId: string) => {
  return widgetRegistry.getComponent(manifestId);
};
</script>

<template>
  <div class="dashboard">
    <h1>Мой дашбоард</h1>

    <div class="widgets-grid">
      <div
        v-for="widget in widgets"
        :key="widget.id"
        class="widget-wrapper"
        :style="{
          gridColumn: `span ${widget.position.w}`,
          gridRow: `span ${widget.position.h}`,
        }"
      >
        <component :is="getWidgetComponent(widget.manifestId)" v-bind="widget.settings" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.widget-wrapper {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
