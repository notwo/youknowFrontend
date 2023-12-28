<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordEditButton from "@/components/keyword/KeywordEditButton.vue";
import { keywordApi } from '@/plugin/apis';
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
  updated_at: String,
  tags: Array
});

const { user } = useAuth0();
const store = inject('keyword');
const dialogStore = inject('dialog');
const api = keywordApi();
const route = useRoute();

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const removeKeyword = (event: HTMLEvent<HTMLButtonElement>): void => {
  if (!window.confirm(`キーワード「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  interface ErrorResponse {
    message: String,
    name: String,
    code: String
  };

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id') as String;
  axios.delete(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, id))
  .then((response: AxiosResponse) => {
    dialogStore.func.value('', 'キーワードを削除しました');
  })
  .catch((e: AxiosError<ErrorResponse>) => {
    dialogStore.func.value('削除エラー', 'キーワード削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
  });
};
</script>

<style scoped>
.p-keyword__item {
  position: relative;
  flex-wrap: wrap;
  width: 90%;
  height: auto;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-keyword__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-keyword__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-keyword__menu {
  display: flex;
  justify-content: flex-end;
  margin: .6rem;
  z-index: 1;
}

.p-keyword__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-keyword__menuLink:hover {
  color: #888;
  cursor: pointer;
}

.p-keyword__body {
  margin: 1rem .5rem;
}

.p-keyword__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-keyword__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-keyword__updated_at {
  margin: .3rem;
  font-size: .8rem;
}

.p-keyword__tags {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: .6rem .4rem;
  max-height: 6rem;
  background: rgba(101, 75, 250, 0.9);
  border-radius: .2rem;
}

.p-keyword__tag {
  margin: .5rem;
  padding: .24rem .55rem;
  font-size: .8rem;
  background: rgba(255,255,255,.9);
  border-radius: .2rem;
}

/* sp */
@media screen and (max-width: 768px) {
  .p-keyword__item {
    width: 80%;
    margin: 1rem;
  }

  .p-keyword__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-keyword__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }

  .p-keyword__tags {
    max-height: none;
  }
}

/* tablet */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .p-keyword__item {
    width: 90%;
    margin: 1rem;
  }

  .p-keyword__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-keyword__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>

<template>
  <section class="p-keyword__item c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'keyword', params: {
      username: String($route.params.username),
      library_id: $route.params.library_id,
      category_id: $route.params.category_id,
      keyword_id: id
    } }">
    </router-link>
    <section class="p-keyword__menu">
      <section class="p-keyword__menuLink">
        <KeywordEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="p-keyword__menuLink">
        <span @click="removeKeyword" class="p-delete__link" :data-id="id">削除</span>
      </section>
    </section>
    <section class="p-keyword__body js-tooltip__title">
      <p class="p-keyword__title">{{ titleForView(title, 'keyword') }}</p>
      <p class="p-keyword__contents">{{ contentForView(content, 'keyword') }}</p>
      <section class="p-keyword__tags">
        <span class="p-keyword__tag" v-for="tag of tags" :key="tag.id">
          {{ titleForView(tag.title, 'tag') }}
        </span>
      </section>
    </section>
    <span class="p-keyword__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>
