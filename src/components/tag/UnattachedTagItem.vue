<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { titleForView } from '@/plugin/util';
import { tagApi } from '@/plugin/apis';

const { user } = useAuth0();

const api = tagApi();
const store = inject('unattachedTag');

const props = defineProps({
  id: Number,
  title: String
});
interface ErrorResponse {
  error: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const removeTag = (event: HTMLEvent<HTMLButtonElement>) => {
  event.stopPropagation();
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

const selectTag = (event: HTMLEvent<HTMLButtonElement>) => {
  event.stopPropagation();

  if (event.currentTarget.classList.contains('selected')) {
    event.currentTarget.classList.remove('selected');
  } else {
    event.currentTarget.classList.add('selected');
  }

  const selectedTags = document.getElementsByClassName('selected');
  if (selectedTags.length > 0) {
    document.getElementById('attachButton').removeAttribute('disabled');
  } else {
    document.getElementById('attachButton').setAttribute('disabled', '');
  }
};
</script>

<style scoped>
.tag-item-wrap {
  margin: 0.2em;
  padding: 1em;
  background: rgba(221, 26, 26, 0.9);
}

.tag-item-wrap.selected {
  margin: 0.2em;
  padding: 1em;
  background: rgba(47, 7, 225, 0.9);
}
</style>

<template>
  <section class="tag-item-wrap" @click="selectTag" :data-id="id">
    <section>
      <span @click="removeTag" class="delete-item" :data-id="id">☓</span>
    </section>
    <section class="title">{{ titleForView(title, 'tag') }}</section>
  </section>
</template>
