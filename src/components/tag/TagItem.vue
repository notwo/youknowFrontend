<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { tagApi } from '@/plugin/apis';

const { user } = useAuth0();

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

const props = defineProps({
  id: Number,
  title: String
});

const api = tagApi();
const store = inject('tag');
const removeTag = (event: HTMLButtonEvent) => {
  if (!window.confirm(`タグ「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id');
  axios.delete(api.detailUrl(user.value.sub, id))
    .then((response: AxiosResponse) => {
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
};
</script>

<style scoped>
.tag-item-wrap {
  margin: 0.2em;
  padding: 1em;
  background: rgba(200, 0,0,0.9);
}
</style>

<template>
  <section class="tag-item-wrap">
    <section>
      <span @click="removeTag" class="delete-item" :data-id="id">☓</span>
    </section>
    <section class="title">{{ title }}</section>
  </section>
</template>
