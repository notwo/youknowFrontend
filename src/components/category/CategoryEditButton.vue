<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
});

const editStore = inject('categoryEdit');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openEditCategoryForm = async (event: HTMLEvent<HTMLButtonElement>): Promise<void> => {
  const modal = document.querySelector('.js-overlay') as HTMLElement;
  modal.classList.add('visible');
  document.getElementById('edit_category_title').value = props.title;
  document.getElementById('edit_category_content').value = props.content;
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
  <span @click="openEditCategoryForm" class="p-editLink">編集</span>
</template>
