<script setup lang="ts">
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { categoryApi } from '@/plugin/apis';
import CategoryEditButton from "@/components/category/CategoryEditButton.vue";

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const { user } = useAuth0();

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const api = categoryApi();
const route = useRoute();
const store = inject('category');
const dialogStore = inject('dialog');
const removeCategory = (event: HTMLEvent<HTMLButtonElement>): void => {
  if (!window.confirm(`カテゴリ「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id') as String;
  axios.delete(api.detailUrl(user.value.sub, route.params.library_id, id))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'カテゴリを削除しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'カテゴリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

</script>

<style scoped>
.p-category__menu {
  margin: .6rem;
  z-index: 1;
}

.p-category__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-category__menuLink:hover {
  color: #888;
  cursor: pointer;
}

</style>

<template>
  <section class="p-category__menu c-flex--end">
    <section class="p-category__menuLink">
      <CategoryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-category__menuLink">
      <span @click="removeCategory" class="p-delete__link" :data-id="id">削除</span>
    </section>
  </section>
</template>
