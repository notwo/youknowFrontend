<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import UnattachedTagItem from "@/components/tag/UnattachedTagItem.vue";
import { pagination } from "@/../config.json";
import { tagApi } from '@/plugin/apis';
import AttachTagButton from "@/components/tag/AttachTagButton.vue";

const { user, isAuthenticated } = useAuth0();
const route = useRoute();
const api = tagApi();
const store = inject('unattachedTag');

interface TagResponse {
  data: []
};
interface ErrorResponse {
  error: String
};

const TagList = ref([]);
onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

  axios.get<TagResponse>(api.listUrl(user.value.sub, route.params.keyword_id, pagination.tag.content_num))
    .then((response: AxiosResponse) => {
      TagList.value = response.data.results;
      store.setItem(TagList.value);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
});
</script>

<style scoped>
#unattached-tag-list {
  background: rgba(255,255,0,0.8);
  margin-top: 2em;
}

.unattached-tag-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>

<template>
  <article id="unattached-tag-list">
    <section class="">未登録のタグ</section>
    <section class="unattached-tag-item">
      <UnattachedTagItem
        v-for="tag in TagList"
          :key="tag.id"
          :id="tag.id"
          :title="tag.title"
          :custom_user="tag.custom_user"
          :custom_user_id="tag.custom_user_id"
      />
    </section>
    <AttachTagButton />
  </article>
</template>
