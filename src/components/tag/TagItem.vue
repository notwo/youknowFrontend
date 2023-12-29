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
  const tagId = event.currentTarget.getAttribute('data-id') as String;
  const tagIds = tagStore.items.list.map((tag) =>
    {
      return { id: tag.id };
    }
  ) as Array<Object>;

  const detachTargetTag = tagStore.items.list.filter(tag => tag.id === Number(tagId)) as Array<Object>;
 
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
.p-tag__item {
  position: relative;
  margin: .9rem .4rem;
  padding: .3rem;
  border: 1px rgba(255,255,255,.9) solid;
  border-radius: .3rem;
  z-index: 0;
  background: rgba(255,255,255,.9);
}

.p-tag__menu {
  margin: .2rem;
  z-index: 1;
}

.p-tag__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-tag__menuLink:hover {
  color: #888;
  cursor: pointer;
}

.p-tag__body {
  margin: .5rem .5rem;
}

.p-tag__title {
  padding: .3rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

/* sp */
@media screen and (max-width: 767px) {
  .p-tag__item {
    margin: .6rem .3rem;
    padding: .2rem;
  }

  .p-tag__menu {
    margin: .1rem;
  }

  .p-delete__link {
    font-size: .8rem;
  }

  .p-tag__title {
    font-size: .9rem;
    font-weight: 300;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>

<template>
  <section class="p-tag__item  c-fadeIn--normal">
    <section class="p-tag__menu c-flex--end">
      <section class="p-tag__menuLink">
        <span @click="detachTag" class="p-delete__link" :data-id="id">削除</span>
      </section>
    </section>
    <section class="p-tag__body">
      <p class="p-tag__title">{{ titleForView(title, 'tag') }}</p>
    </section>
  </section>
</template>
