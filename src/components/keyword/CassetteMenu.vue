<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { keywordApi, categoryApi } from '@/plugin/apis';
import { pagination } from "@/../config.json";
import KeywordEditButton from "@/components/keyword/KeywordEditButton.vue";

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const { user } = useAuth0();
const store = inject('keyword');
const dialogStore = inject('dialog');
const moveStore = inject('keywordMove');
const api = keywordApi();
const cApi = categoryApi();
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
  const id = event.currentTarget.dataset.id as String;
  axios.delete(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, id))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'キーワードを削除しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'キーワード削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

const openKeywordMoveModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  const overlay = document.getElementById('overlay-move') as HTMLElement;
  overlay.classList.add('visible');
  document.getElementById('move-form').classList.add('visible');

  const id = event.currentTarget.dataset.id as String;
  const title = event.currentTarget.dataset.title as String;

  interface ErrorResponse {
    message: String,
    name: String,
    code: String
  };

  axios.get(cApi.listUrl(user.value.sub, route.params.library_id, pagination.category.content_num))
    .then((response: AxiosResponse) => {
      moveStore.id.value = id;
      // 自身のカテゴリIDは除外
      const result = response.data.results.filter((_obj) => { return _obj.id !== Number(route.params.category_id)})
      moveStore.list = ref(result);
      moveStore.title = ref(title);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('読み込みエラー', 'カテゴリ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
.p-keyword__menuArea {
  margin: .6rem;
  z-index: 1;
}

.p-keyword__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-keyword__menuLink:hover .p-keyword__menuList {
  transform: scale(1.2);
  visibility: visible;
}
.p-keyword__menuLink .p-keyword__menuButton {
  font-size: 2.1rem;
}

.p-keyword__menuList {
  position: absolute;
  margin: 1.3rem .3rem;
  padding: .3rem;
  visibility: hidden;
  right: .3rem;
  top: 1.3rem;
  border-radius: .3rem;
  transform-origin: 100% 0;
  transform: scale(.1);
  transition: all .2s;
  background-color: #EEEEEE;
}

.p-keyword__menu {
  margin: .9rem .5rem;
  font-size: 1rem;
}
.p-keyword__menu:hover, .p-keyword__menu:active {
  color: #888;
  cursor: pointer;
}

.p-delete__link {
}
</style>

<template>
  <section class="p-keyword__menuArea c-flex--end">
    <section class="p-keyword__menuLink">
      <span class="p-keyword__menuButton">…</span>
      <ul class="p-keyword__menuList">
        <li class="p-keyword__menu">
          <KeywordEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
        </li>
        <li class="p-keyword__menu">
          <span @click="removeKeyword" class="p-delete__link" :data-id="id">削除</span>
        </li>
        <li class="p-keyword__menu">
          <span @click="openKeywordMoveModal" :data-id="id" :data-title="title">カテゴリ移動</span>
        </li>
      </ul>
    </section>
  </section>
</template>
