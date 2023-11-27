<template>
  <section class="keyword-item-wrap tooltip-content">
    <section>
      <KeywordEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      <span @click="removeKeyword" class="delete-item" :data-id="id"></span>
    </section>
    <router-link :to="{ name: 'keyword', params: {
        username: String($route.params.username),
        library_id: $route.params.library_id,
        category_id: $route.params.category_id,
        keyword_id: id
      } }">
      <section class="title">{{ titleView(title) }}</section>
      <section class="contents">{{ contentView(content) }}</section>
      <section class="tags">
        <section v-for="tag of tags" :key="tag.id">
          {{ tag.title }}
        </section>
      </section>
    </router-link>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordEditButton from "@/components/keyword/KeywordEditButton.vue";
import { keywordApi } from '@/plugin/apis';
import { item } from "@/../config.json";
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'KeywordItem',
  components: {
    KeywordEditButton,
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
    tags: Array
  },
  setup(props) {
    const { user } = useAuth0();
    const store = inject('keyword');
    const api = keywordApi();
    const route = useRoute();

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const removeKeyword = (event: HTMLEvent<HTMLButtonElement>) => {
      if (!window.confirm(`キーワード「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      interface ErrorResponse {
        message: String,
        name: String,
        code: String
      };

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, id))
      .then((response: AxiosResponse) => {
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    const titleView = (title) => {
      return title.length > item.keyword.titleMaxLength ? title.substring(0, item.keyword.titleMaxLength) + '...' : title;
    };
    const contentView = (content) => {
      return content.length > item.keyword.contentMaxLength ? content.substring(0, item.keyword.contentMaxLength) + '...' : content;
    };
    return {
      user,
      titleView,
      contentView,
      removeKeyword
    };
  }
});
</script>

<style scoped>
.keyword-item-wrap {
  width: 30%;
  margin: 0.6rem;
  height: 7em;
  background-color: red;
  flex-wrap: wrap;
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
