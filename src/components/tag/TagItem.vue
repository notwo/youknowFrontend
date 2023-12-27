<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute } from 'vue-router';
import { titleForView } from '@/plugin/util';
import { keywordApi } from '@/plugin/apis';

const route = useRoute();
const { user } = useAuth0();
const api = keywordApi();
const tagStore = inject('tag');
const unattachedTagStore = inject('unattachedTag');
const dialogStore = inject('dialog');

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

const detachTag = (event: HTMLEvent<HTMLButtonElement>): void => {
  const tagId = event.currentTarget.getAttribute('data-id');
  const tagIds = tagStore.items.list.map((tag) =>
    {
      return { id: tag.id };
    }
  );

  const detachTargetTag = tagStore.items.list.filter(tag => tag.id === Number(tagId));
 
  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    tags: tagIds.filter(_tagId => _tagId.id !== Number(tagId))
  };

  axios.patch(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id), requestParam)
    .then((response: AxiosResponse) => {
      tagStore.setItem(response.data.tags);
      unattachedTagStore.concat(detachTargetTag);
      dialogStore.func.value('タグ解除', `タグ「${detachTargetTag[0]?.title}」を解除しました`);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('タグ解除エラー', 'タグ解除に失敗しました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
.tag-item {
  position: relative;
  margin: .9rem .4rem;
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

/* sp */
@media screen and (max-width: 767px) {
  .tag-item {
    margin: .6rem .3rem;
    padding: .2rem;
  }

  .tag-menu {
    margin: .1rem;
  }

  .delete-item {
    font-size: .8rem;
  }

  .title {
    font-size: .9rem;
    font-weight: 300;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>

<template>
  <section class="tag-item">
    <section class="tag-menu">
      <section class="tag-menu-item">
        <span @click="detachTag" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="tag-item-body">
      <p class="title">{{ titleForView(title, 'tag') }}</p>
    </section>
  </section>
</template>
