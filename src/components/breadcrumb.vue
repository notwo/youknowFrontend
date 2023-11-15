<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const titlesStore = inject('titles');

const breadcrumbString = ref([
  {
    name: 'top',
    pattern: `^\/`,
    params: {},
    text: 'TOP',
    textValue: 'TOP'
  },
  {
    name: 'libraries',
    pattern: '^\/.+\/libraries',
    params: { username: String(route.params.username) },
    text: 'ライブラリ',
    textValue: titlesStore.library === '' ? 'ライブラリ' : titlesStore.library
  },
  {
    name: 'categories',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories',
    params: { username: String(route.params.username), library_id: route.params.library_id },
    text: 'カテゴリ',
    textValue: titlesStore.category === '' ? 'カテゴリ' : titlesStore.category
  },
  {
    name: 'keywords',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories\/[0-9]+\/keywords',
    params: { username: String(route.params.username), library_id: route.params.library_id, category_id: route.params.category_id },
    text: 'キーワード',
    textValue: titlesStore.keyword === '' ? 'キーワード' : titlesStore.keyword
  },
  {
    name: 'keyword',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories\/[0-9]+\/keywords\/[0-9]+',
    params: { username: String(route.params.username), library_id: route.params.library_id, category_id: route.params.category_id, keyword_id: route.params.keyword_id },
    text: 'キーワード詳細',
    textValue: ''
  },
]);

const fullPath = route.fullPath;
</script>

<style scoped>
.breadcrumb-contents {
  display: flex;
}
</style>

<template>
  <ul class="breadcrumb-contents">
    <li v-for="v in breadcrumbString" :key="v.name" class="breadcrumb-content">
      <span v-if="fullPath.match(v.pattern) && v.name !== 'top'" class="space">></span>
      <router-link v-if="fullPath.match(v.pattern) && fullPath.match(v.pattern)[0] !== fullPath" :to="{ name: v.name, params: v.params }">
        <span>{{ v.textValue }}</span>
      </router-link>
      <span v-else-if="fullPath.match(v.pattern) && fullPath.match(v.pattern)[0] === fullPath">
        {{ v.text }}
      </span>
    </li>
  </ul>
</template>
