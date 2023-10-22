<template>
  <section class="category-item-wrap">
    <section>
      <CategoryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      <span @click="removeCategory" class="delete-item" :data-id="id"></span>
    </section>
    <section class="title">{{ title }}</section>
    <section class="content">{{ content }}</section>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryEditButton from "@/components/category/CategoryEditButton.vue";
import { categoryDeleteUrl } from '@/plugin/apis';

export default defineComponent({
  name: 'CategoryItem',
  components: {
    CategoryEditButton
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

    const route = useRoute();
    const store = inject('category');
    const removeCategory = (event: HTMLButtonEvent) => {
      if (!window.confirm(`カテゴリ「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(categoryDeleteUrl(user.value.sub, route.params.library_id, id))
      .then((response: AxiosResponse) => {
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    return {
      removeCategory
    };
  }
});
</script>

<style scoped>
.category-item-wrap {
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