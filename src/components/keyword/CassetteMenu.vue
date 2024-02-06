<script setup lang="ts">
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { keywordApi } from '@/plugin/apis';
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
.p-keyword__menu {
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

</style>

<template>
  <section class="p-keyword__menu c-flex--end">
    <section class="p-keyword__menuLink">
      <KeywordEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-keyword__menuLink">
      <span @click="removeKeyword" class="p-delete__link" :data-id="id">削除</span>
    </section>
  </section>
</template>
