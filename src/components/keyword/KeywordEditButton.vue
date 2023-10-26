<template>
  <span @click="openEditKeywordForm">編集</span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'KeywordEditButton',
  components: {},
  props: {
    edit_state: Object,
    id: Number,
    title: String,
    content: String
  },
  setup(props) {
    const editStore = inject('keywordEdit');

    const openEditKeywordForm = (event: HTMLButtonEvent) => {
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
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

    return {
      openEditKeywordForm
    };
  }
});
</script>

<style scoped>

</style>
