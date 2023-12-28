<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const editStore = inject('keywordEdit');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openEditKeywordForm = (event: HTMLEvent<HTMLButtonElement>): void => {
  const modal = document.getElementsByClassName('l-overlay') as HTMLCollectionOf<HTMLElement>;
  modal[0].classList.add('visible');
  document.getElementById('edit_keyword_title').value = props.title;
  document.getElementById('edit_keyword_content').value = props.content;
  props.edit_state.title = props.title;
  props.edit_state.content = props.content;
  editStore.id = props.id;
  editStore.title = props.title;
  editStore.content = props.content;
  document.getElementById('register-form').classList.remove('visible');
  document.getElementById('edit-form').classList.add('visible');
};
</script>

<style scoped>
</style>

<template>
  <span @click="openEditKeywordForm" class="p-editLink">編集</span>
</template>
