<template>
  <section class="library-item-wrap tooltip-content">
    <section>
      <LibraryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      <span @click="removeLibrary" class="delete-item" :data-id="id"></span>
    </section>
    <router-link :to="{ name: 'categories', params: { username: String($route.params.username), library_id: id } }">
      <section class="title">{{ titleView(title) }}</section>
      <section class="contents">{{ contentView(content) }}</section>
    </router-link>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryEditButton from "@/components/library/LibraryEditButton.vue";
import { libraryApi } from '@/plugin/apis';
import { item } from "@/../config.json";
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'LibraryItem',
  components: {
    LibraryEditButton,
    Tooltip
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
    const removeLibrary = (event: HTMLButtonEvent) => {
      if (!window.confirm(`ライブラリ「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      interface ErrorResponse {
        message: String,
        name: String,
        code: String
      };

      const api = libraryApi();

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, id))
      .then((response: AxiosResponse) => {
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    const titleView = (title) => {
      return title.length > item.library.titleMaxLength ? title.substring(0, item.library.titleMaxLength) + '...' : title;
    };
    const contentView = (content) => {
      return content.length > item.library.contentMaxLength ? content.substring(0, item.library.contentMaxLength) + '...' : content;
    };

    return {
      user,
      titleView,
      contentView,
      removeLibrary
    };
  },
});
</script>

<style scoped>
.library-item-wrap {
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
