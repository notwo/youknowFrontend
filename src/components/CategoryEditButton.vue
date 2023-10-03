<template>
  <span @click="openEditCategoryForm">編集</span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'CategoryEditButton',
  components: {},
  props: {
    id: Number,
    title: String,
    content: String
  },
  setup(props) {
    const openEditCategoryForm = async (event: HTMLButtonEvent) => {
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.add('visible');
      document.getElementById('edit_category_title').value = props.title;
      document.getElementById('edit_category_content').value = props.content;
      document.getElementById('register-form').classList.remove('visible');
      document.getElementById('edit-form').classList.add('visible');
    };

    return {
      openEditCategoryForm
    };
  }
});
</script>

<style scoped>

</style>
