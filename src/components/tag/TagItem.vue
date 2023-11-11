<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute, useRouter } from 'vue-router';
import { item } from "@/../config.json";
import { keywordApi } from '@/plugin/apis';

const route = useRoute();
const { user } = useAuth0();
const api = keywordApi();
const tagStore = inject('tag');
const unattachedTagStore = inject('unattachedTag');

interface KeywordRequest {
  custom_user: String,
  content: String
};
interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

const props = defineProps({
  id: Number,
  title: String
});

const unattachTag = (event: HTMLButtonEvent) => {
  const tagId = event.currentTarget.getAttribute('data-id');
  const tagIds = tagStore.items.list.map((tag) =>
    {
      return { id: tag.id };
    }
  );

  const unattachTargetTag = tagStore.items.list.filter(tag => tag.id === Number(tagId));
 
  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    tags: tagIds.filter(_tagId => _tagId.id !== Number(tagId))
  };

  axios.patch(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id), requestParam)
    .then((response: AxiosResponse) => {
      tagStore.setItem(response.data.tags);
      unattachedTagStore.concat(unattachTargetTag);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
};

const titleView = props.title.length > item.tag.titleMaxLength ? props.title.substring(0, item.tag.titleMaxLength) + '...' : props.title;
</script>

<style scoped>
.tag-item-wrap {
  margin: 0.2em;
  padding: 1em;
  background: rgba(221, 26, 26, 0.9);
}
</style>

<template>
  <section class="tag-item-wrap">
    <section>
      <span @click="unattachTag" class="delete-item" :data-id="id">☓</span>
    </section>
    <section class="title">{{ titleView }}</section>
  </section>
</template>
