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
  position: relative;
  margin: 5rem .8rem;
  border: 1px solid #888;
  border-radius: .4rem;
}

#unattached-tag-list .subject {
  display: inline-block;
  position: absolute;
  padding: 0 .5rem;
  transform: translateX(42%);
  top: -.7rem;
  left: 0;
  line-height: 1;
  font-size: 1.6em;
  font-weight: 800;
  background-color: rgb(250, 250, 252);
}

.unattached-tag-body {
  margin: .8rem;
}

.unattached-tag-item-wrap {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin: 1.4rem 0;
}
</style>

<template>
  <article id="unattached-tag-list">
    <section class="subject">未登録のタグ</section>
    <section class="unattached-tag-body">
      <section class="unattached-tag-item-wrap">
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
    </section>
  </article>
</template>
