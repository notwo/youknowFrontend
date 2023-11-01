<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { pagination } from "@/../config.json";
import { tagApi } from '@/plugin/apis';
import TagItem from "@/components/tag/TagItem.vue";
import TagForm from "@/components/tag/TagForm.vue";

const { user, isAuthenticated } = useAuth0();
const store = inject('tag');
const api = tagApi();
const route = useRoute();

interface TagResponse {
  data: []
};
interface ErrorResponse {
  error: String
};

const TagList = ref([]);
let currentPage = 1;

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

  axios.get<TagResponse>(api.listUrl(user.value.sub, pagination.tag.content_num, pagination.tag.content_num * (currentPage -1)))
    .then((response: AxiosResponse) => {
      console.log(response)
      TagList.value = response.data.results;
      store.setItem(TagList.value);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
});
</script>

<style scoped>
/* 一旦視覚的にわかりやすくするためにつける */
#tag-list {
  background: rgba(210,210,210, 0.9);
  width: 100%;
  height: 79px;
}

.tag-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>

<template>
  <article id="tag-list">
    <TagForm />
    <section class="tag-item">
      <TagItem
        v-for="tag in TagList"
          :key="tag.id"
          :id="tag.id"
          :title="tag.title"
          :custom_user="tag.custom_user"
          :custom_user_id="tag.custom_user_id"
      />
    </section>
  </article>
</template>
