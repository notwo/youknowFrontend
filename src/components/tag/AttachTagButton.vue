
<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute, useRouter } from 'vue-router';
import { keywordApi, tagApi } from '@/plugin/apis';

const route = useRoute();
const { user } = useAuth0();
const tagStore = inject('tag');
const unattachedTagStore = inject('unattachedTag');
const api = {
  keyword: keywordApi(),
  tag: tagApi()
};

interface KeywordRequest {
  custom_user: String,
  content: String
};

const AttachTag = () => {
  const selectedTags = document.getElementsByClassName('selected');
  const tagIds = tagStore.items.list.map((tag) =>
    {
      return { id: tag.id };
    }
  );
  const unattachedTagIds = Array.from(selectedTags).map((tag) => {
    return Number(tag.getAttribute('data-id'));
  });

  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    tags: tagIds.concat(unattachedTagIds.map((tag_id) => {
      return { id: tag_id }
    }))
  };

  axios.patch(api.keyword.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id), requestParam)
    .then((response: AxiosResponse) => {
      tagStore.setItem(response.data.tags);
      unattachedTagStore.removeList(unattachedTagIds);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
}

</script>

<template>
  <section>
    <button type="button" @click="AttachTag" id="attachButton" :disabled="true">選択したタグをキーワードにつける</button>
  </section>
</template>
