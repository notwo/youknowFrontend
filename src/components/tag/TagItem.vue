<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute, useRouter } from 'vue-router';
import { titleForView } from '@/plugin/util';
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

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const unattachTag = (event: HTMLEvent<HTMLButtonElement>) => {
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
</script>

<style scoped>
.tag-item {
  position: relative;
  margin: .4rem;
  padding: .3rem;
  border: 1px rgba(255,255,255,.9) solid;
  border-radius: .3rem;
  z-index: 0;
  background: rgba(255,255,255,.9);
  animation: fadeIn .7s ease;
}

@keyframes fadeIn {
  0%{
    display: none;
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

.tag-menu {
  display: flex;
  justify-content: flex-end;
  margin: .2rem;
  z-index: 1;
}

.tag-menu-item {
  margin: .3rem;
  z-index: 1;
}

.tag-menu-item:hover {
  color: #888;
  cursor: pointer;
}

.tag-item-body {
  margin: .5rem .5rem;
}

.title {
  padding: .3rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

</style>

<template>
  <section class="tag-item">
    <section class="tag-menu">
      <section class="tag-menu-item">
        <span @click="unattachTag" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="tag-item-body">
      <section class="title">{{ titleForView(title, 'tag') }}</section>
    </section>
  </section>
</template>
