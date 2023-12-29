<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import UnattachedTagItem from "@/components/tag/UnattachedTagItem.vue";
import { pagination } from "@/../config.json";
import { tagApi } from '@/plugin/apis';
import AttachTagButton from "@/components/tag/AttachTagButton.vue";

const { user, isAuthenticated } = useAuth0();
const route = useRoute();
const api = tagApi();
const store = inject('unattachedTag');
const dialogStore = inject('dialog');

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
      dialogStore.func.value('読み込みエラー', 'タグ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
});
</script>

<style scoped>
#p-unattached__tagList {
  position: relative;
  margin: 5rem .8rem;
  border: 1px solid #888;
  border-radius: .4rem;
}

#p-unattached__tagList .p-subject {
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

.p-tag__body {
  margin: .8rem;
}

.p-tag__itemWrap {
  flex-wrap: wrap;
  margin: 1.4rem 0;
}

/* sp */
@media screen and (max-width: 768px) {
  #p-unattached__tagList .p-subject {
    transform: translateX(34%);
  }
}
</style>

<template>
  <article v-if="TagList.length > 0" id="p-unattached__tagList">
    <span class="p-subject">未登録のタグ</span>
    <section class="p-tag__body">
      <section class="p-tag__itemWrap c-flex--start">
        <UnattachedTagItem
          v-for="tag in TagList"
            :key="tag.id"
            :id="tag.id"
            :title="tag.title"
        />
      </section>
      <AttachTagButton />
    </section>
  </article>
</template>
