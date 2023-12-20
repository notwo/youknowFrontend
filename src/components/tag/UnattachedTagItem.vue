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

const removeTag = (event: HTMLEvent<HTMLButtonElement>): void => {
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

const selectTag = (event: HTMLEvent<HTMLButtonElement>): void => {
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
.unattached-tag-item {
  margin: 0.2em;
  padding: 1em;
  border: 1px rgba(47, 7, 225, 0.9) solid;
  border-radius: .3rem;
  z-index: 0;
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

.unattached-tag-item.selected {
  margin: 0.2em;
  padding: 1em;
  color: #eee;
  background: rgba(47, 7, 225, 0.9);
}

.unattached-tag-menu {
  display: flex;
  justify-content: flex-end;
  margin: .2rem;
  z-index: 1;
}

.unattached-tag-menu-item {
  margin: .3rem;
  z-index: 1;
}
.unattached-tag-menu-item:hover {
  color: #888;
  cursor: pointer;
}

.unattached-tag-item-body {
  margin: .5rem .5rem;
}

.title {
  padding: .3rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}
</style>

<template>
  <section class="unattached-tag-item" @click="selectTag" :data-id="id">
    <section class="unattached-tag-menu">
      <section class="unattached-tag-menu-item">
        <span @click="removeTag" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="unattached-tag-item-body">
      <section class="title">{{ titleForView(title, 'tag') }}</section>
    </section>
  </section>
</template>
