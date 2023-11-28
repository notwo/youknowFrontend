<template>
  <section class="category-item tooltip-content">
    <router-link :to="{ name: 'keywords', params: { username: String($route.params.username), library_id: $route.params.library_id, category_id: id } }"></router-link>
    <section class="category-menu">
      <section class="category-menu-item">
        <CategoryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="category-menu-item">
        <span @click="removeCategory" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="category-item-body">
      <section class="title">{{ titleView(title) }}</section>
      <section class="contents">{{ contentView(content) }}</section>
    </section>
    <section class="updated_at">{{ timeFormat(updated_at) }} 更新</section>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryEditButton from "@/components/category/CategoryEditButton.vue";
import { timeFormat } from '@/plugin/util';
import { categoryApi } from '@/plugin/apis';
import { item } from "@/../config.json";
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'CategoryItem',
  components: {
    CategoryEditButton,
    timeFormat,
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

    interface ErrorResponse {
      message: String,
      name: String,
      code: String
    };

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const api = categoryApi();
    const route = useRoute();
    const store = inject('category');
    const removeCategory = (event: HTMLEvent<HTMLButtonElement>) => {
      if (!window.confirm(`カテゴリ「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, route.params.library_id, id))
      .then((response: AxiosResponse) => {
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    const titleView = (title) => {
      return title.length > item.category.titleMaxLength ? title.substring(0, item.category.titleMaxLength) + '...' : title;
    };
    const contentView = (content) => {
      return content.length > item.category.contentMaxLength ? content.substring(0, item.category.contentMaxLength) + '...' : content;
    };

    return {
      titleView,
      contentView,
      timeFormat,
      removeCategory
    };
  }
});
</script>

<style scoped>
.category-item {
  position: relative;
  flex-wrap: wrap;
  width: 90%;
  height: 16rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
  animation: fadeIn .7s ease;
}
.category-item:hover {
  border: 1px rgb(74, 92, 255) solid;
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

.category-item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.category-menu {
  display: flex;
  justify-content: flex-end;
  margin: .6rem;
  z-index: 1;
}

.category-menu-item {
  margin: .3rem;
  z-index: 1;
}

.category-menu-item:hover {
  color: #888;
  cursor: pointer;
}

.category-item-body {
  margin: 1rem .5rem;
}

.title {
  padding: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.contents {
  padding: 1rem 0;
  line-height: 1.5rem;
}

.updated_at {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}
</style>
