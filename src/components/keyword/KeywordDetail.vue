<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { keywordApi } from '@/plugin/apis';
import TagList from "@/components/tag/TagList.vue";

const { user, isAuthenticated } = useAuth0();
const api = keywordApi();
const route = useRoute();
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

  axios.get<KeywordResponse>(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id))
    .then((response: AxiosResponse) => {
      Keyword.value = response.data;
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
});

</script>

<template>
  <Breadcrumb />
  <section>keyword詳細</section>
  <section class="title">{{ Keyword.title }}</section>
  <section class="contents">{{ Keyword.content }}</section>
  <TagList />
</template>
