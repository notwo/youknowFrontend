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
  const id = event.currentTarget.dataset.id as String;
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
.p-category__menuArea {
  margin: .6rem;
  z-index: 1;
}

.p-category__menuLink {
  margin: .3rem;
  z-index: 1;
}
.p-category__menuLink:hover .p-category__menuList {
  transform: scale(1.2);
  visibility: visible;
}
.p-category__menuLink .p-category__menuButton {
  font-size: 2.1rem;
}

.p-category__menuList {
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

.p-category__menu {
  margin: .9rem .5rem;
  font-size: 1.3rem;
}
.p-category__menu:hover, .p-category__menu:active {
  color: #888;
  cursor: pointer;
}
</style>

<template>
  <section class="p-category__menuLink">
    <span class="p-category__menuButton">…</span>
    <ul class="p-category__menuList">
      <li class="p-category__menu">
        <CategoryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </li>
      <li class="p-category__menu">
        <span @click="removeCategory" class="p-delete__link" :data-id="id">削除</span>
      </li>
    </ul>
  </section>
</template>
