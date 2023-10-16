<template>
  <section class="library-item">
    <section>
      <LibraryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      <span @click="removeLibrary" class="delete-item" :data-id="id"></span>
    </section>
    <router-link :to="{ name: 'categories', params: { username: String($route.params.username), library_id: id } }">
      <section class="title">{{ title }}</section>
      <section class="contents">{{ content }}</section>
    </router-link>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryEditButton from "@/components/LibraryEditButton.vue";

export default defineComponent({
  name: 'LibraryItem',
  components: {
    LibraryEditButton
  },
  props: {
    edit_state: Object,
    id: Number,
    title: String,
    content: String,
    custom_user: String,
    custom_user_id: String,
    created_at: String,
    updated_at: String,
  },
  setup(props) {
    const { user } = useAuth0();
    const store = inject('library');
    const removeLibrary = async (event: HTMLButtonEvent) => {
      if (!window.confirm(`ライブラリ「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      interface ErrorResponse {
        message: String,
        name: String,
        code: String
      };

      // api実行前に呼ばないとstoreの中身が検索できない
      store.remove(props.id);
      const id = event.currentTarget.getAttribute('data-id');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${user.value.sub}/libraries/${id}`)
      .then((response: AxiosResponse) => {
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    return {
      user,
      removeLibrary
    };
  },
});
</script>

<style scoped>
.library-item {
  width: calc(30% - 15px);
  margin: 0.6em;
  height: 7em;
  background-color: red;
  flex-wrap: wrap;
  /*box-shadow: 10px 10px 0 #222222;*/
}

.delete-item {
  display: block;
  position: relative;
  width: 2em;
  height: 2em;
  margin-left: auto;
}
.delete-item::before, .delete-item::after {
  display: block;
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  top: 50%;
  left: 50%;
  background-color: black;
}
.delete-item::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.delete-item::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}
</style>
