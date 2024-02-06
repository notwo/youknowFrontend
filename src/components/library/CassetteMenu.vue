<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { libraryApi } from '@/plugin/apis';
import LibraryEditButton from "@/components/library/LibraryEditButton.vue";

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const { user } = useAuth0();
const store = inject('library');
const dialogStore = inject('dialog');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const removeLibrary = (event: HTMLEvent<HTMLButtonElement>): void => {
  if (!window.confirm(`ライブラリ「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  interface ErrorResponse {
    message: String,
    name: String,
    code: String
  };

  const api = libraryApi();

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id') as String;
  axios.delete(api.detailUrl(user.value.sub, id))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'ライブラリを削除しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'ライブラリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
.p-library__menu {
  margin: .6rem;
  z-index: 1;
}

.p-library__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-library__menuLink:hover {
  color: #888;
  cursor: pointer;
}

</style>

<template>
  <section class="p-library__menu c-flex--end">
    <section class="p-library__menuLink">
      <LibraryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-library__menuLink">
      <span @click="removeLibrary" class="p-delete__link" :data-id="id">削除</span>
    </section>
  </section>
</template>
