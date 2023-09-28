<template>
  <span @click="openEditCategoryForm">編集</span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'CategoryEditButton',
  components: {},
  setup() {
    const openEditCategoryForm = async (event: HTMLButtonEvent) => {
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.add('visible');
    };

    return {
      openEditCategoryForm
    };
  }
});
</script>

<style scoped>

</style>
