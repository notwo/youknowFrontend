<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { keywordApi } from '@/plugin/apis';
import TagList from "@/components/tag/TagList.vue";
import UnattachedTagList from "@/components/tag/UnattachedTagList.vue";
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';

const { user, isAuthenticated } = useAuth0();
const api = keywordApi();
const route = useRoute();
const store = inject('tag');
const titlesStore = inject('titles');
const Keyword = ref({
  title: '',
  content: ''
});

interface KeywordResponse {
  data: []
};
interface ErrorResponse {
  error: String
};

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

  axios.get<KeywordResponse>(
      api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id)
    )
    .then((response: AxiosResponse) => {
      titlesStore.setKeyword(response.data.title);
      Keyword.value = response.data;
      store.setItem(Keyword.value.tags);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
});

onUnmounted(() => {
  store.allClear();
});
</script>

<style scoped>

</style>

<template>
  <Breadcrumb />
  <section class="title">{{ Keyword.title }}</section>
  <section class="contents">{{ Keyword.content }}</section>
  <TagList />
  <UnattachedTagList />
  <ScrollToTopButton />
</template>
