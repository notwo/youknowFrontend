<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { keywordApi } from '@/plugin/apis';
import TagList from "@/components/tag/TagList.vue";
import UnattachedTagList from "@/components/tag/UnattachedTagList.vue";
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
import Dialog from '@/components/common/Dialog.vue';

const { user, isAuthenticated } = useAuth0();
const api = keywordApi();
const route = useRoute();
const store = inject('tag');
const titlesStore = inject('titles');
const dialogStore = inject('dialog');
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

  // キーワード詳細に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
  document.documentElement.scrollTop = 0;

  axios.get<KeywordResponse>(
    api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id)
  )
    .then((response: AxiosResponse) => {
      titlesStore.setKeyword(response.data.title);
      Keyword.value = response.data;
      store.setItem(Keyword.value.tags);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('読み込みエラー', 'キーワード読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
});

onUnmounted(() => {
  store.allClear();
});
</script>

<style scoped>
.p-keyword__body {
  margin: 3rem 2rem;
}

.p-keyword__title {
  margin: 2rem 1rem;
  font-size: 2.5rem;
  font-weight: 800;
}

.p-keyword__contents {
  margin: 2rem 1rem;
  font-size: 1.5rem;
}
</style>

<template>
  <Dialog />
  <Breadcrumb />
  <section class="p-keyword__body">
    <p class="p-keyword__title">{{ Keyword.title }}</p>
    <p class="p-keyword__contents">{{ Keyword.content }}</p>
  </section>
  <TagList />
  <UnattachedTagList />
  <ScrollToTopButton />
</template>
