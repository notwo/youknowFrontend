<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const editStore = inject('libraryEdit');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openEditLibraryForm = (event: HTMLEvent<HTMLButtonElement>): void => {
  const overlay = document.querySelector('#overlay-edit') as HTMLElement;
  overlay.classList.add('visible');
  document.getElementById('edit_library_title').value = props.title;
  document.getElementById('edit_library_content').value = props.content;
  props.edit_state.title = props.title;
  props.edit_state.content = props.content;
  editStore.id = props.id;
  editStore.title = props.title;
  editStore.content = props.content;
  document.getElementById('edit-form').classList.add('visible');
};
</script>

<style scoped>
</style>

<template>
  <span @click="openEditLibraryForm" class="p-editLink">編集</span>
</template>
