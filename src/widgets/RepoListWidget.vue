<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  title?: string;
  repoCount?: number;
}

const props: Props = withDefaults(defineProps<Props>(), {
  title: 'Мои репозитории',
  repoCount: 5,
});

const loading = ref(true);
const repos = ref<any[]>([]);

onMounted(async () => {
  // TODO: Заменить запросом, когда появится бэк
  const res = await fetch(`https://api.github.com/users/octocat/repos?per_page=${props.repoCount}`);

  repos.value = await res.json();
  loading.value = false;
});
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <div v-if="loading">Загрузка</div>
    <ul v-else>
      <li v-for="repo in repos" :key="repo.id" class="py-1">
        {{ repo.name }} - ⭐ {{ repo.stargazers_count }}
      </li>
    </ul>
  </div>
</template>
