<template>
  <ul class="breadcrumb-contents">
    <li v-for="v in breadcrumbString" :key="v.name" class="breadcrumb-content">
      <span v-if="fullPath.match(v.pattern) && v.name !== 'top'" class="space">></span>
      <router-link v-if="fullPath.match(v.pattern) && fullPath.match(v.pattern)[0] !== fullPath" :to="{ name: v.name, params: v.params }">
        <span>{{ v.text }}</span>
      </router-link>
      <span v-else-if="fullPath.match(v.pattern) && fullPath.match(v.pattern)[0] === fullPath">
        {{ v.text }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const breadcrumbString = [
  {
    name: 'top',
    path: '/',
    pattern: `^\/`,
    params: {},
    text: 'TOP',
  },
  {
    name: 'libraries',
    path: '/libraries',
    pattern: '^\/.+\/libraries',
    params: { username: String(route.params.username) },
    text: 'ライブラリ',
  },
  {
    name: 'categories',
    path: '/categories',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories',
    params: { username: String(route.params.username), library_id: route.params.library_id },
    text: 'カテゴリ',
  },
  {
    name: 'keywords',
    path: '/keywords',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories\/[0-9]+\/keywords',
    params: { username: String(route.params.username), library_id: route.params.library_id, category_id: route.params.category_id },
    text: 'キーワード',
  },
];

const fullPath = route.fullPath;
</script>

<style scoped>
.breadcrumb-contents {
  display: flex;
}
</style>
