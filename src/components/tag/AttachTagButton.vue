<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute } from 'vue-router';
import { keywordApi, tagApi } from '@/plugin/apis';

const route = useRoute();
const { user } = useAuth0();
const tagStore = inject('tag');
const unattachedTagStore = inject('unattachedTag');
const dialogStore = inject('dialog');
const api = {
  keyword: keywordApi(),
  tag: tagApi()
};

interface KeywordRequest {
  custom_user: String,
  tags: Array<Object>
};

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

const AttachTag = (): void => {
  const selectedTags = document.getElementsByClassName('selected') as HTMLCollectionOf<HTMLElement>;
  const tagIds = tagStore.items.list.map((tag) =>
    {
      return { id: tag.id };
    }
  );
  const unattachedTagIds = Array.from(selectedTags).map((tag) => {
    return Number(tag.dataset.id);
  });

  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    tags: tagIds.concat(unattachedTagIds.map((_tagId) => {
      return { id: _tagId };
    }))
  };

  axios.patch(api.keyword.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id), requestParam)
    .then((response: AxiosResponse) => {
      tagStore.setItem(response.data.tags);
      unattachedTagStore.removeList(unattachedTagIds);
      dialogStore.func.value('タグ追加', 'タグを追加しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('タグ追加エラー', 'タグ追加に失敗しました。暫くお待ちいただいてから再度お試しください', 'error');
    });
}

</script>

<style scoped>
.p-formWrap {
  margin: 0 auto;
  max-width: 20rem;
}

.p-form__field .c-btn {
  display: block;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 800;
}
</style>

<template>
  <form action="" class="p-attachTagForm">
    <section class="p-formWrap">
      <section class="p-form__group">
        <section class="p-form__field">
          <button type="button" @click="AttachTag" id="attachButton" class="c-btn c-btn--register" :disabled="true">選択したタグをキーワードにつける</button>
        </section>
      </section>
    </section>
  </form>
</template>
