<template>
  <article id="category-list">
    <CategoryItem
      v-for="category in CategoryList"
      :key="category.id"
      :id="category.id"
      :title="category.title"
      :content="category.content"
      :custom_user="category.custom_user"
      :custom_user_id="category.custom_user_id"
      :created_at="category.created_at"
      :updated_at="category.updated_at"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import CategoryItem from "@/components/CategoryItem.vue";

export default defineComponent({
  name: 'CategoryList',
  components: {
    CategoryItem
  },
  setup() {
    const CategoryList = ref([]);
    const store = inject('category');
    const auth0 = store.getUser();

    const route = useRoute();
    onMounted(() => {
      interface CategoryResponse {
        data: []
      };
      interface ErrorResponse {
        error: string
      };

      // ----------------------- events -----------------------
      (async () => {
        await axios.get<CategoryResponse>(`http://127.0.0.1:8000/api/libraries/${route.params.library_id}/categories/`)
          .then((response: AxiosResponse) => {
            if (response.data.length >= 1) {
              CategoryList.value = response.data;
              store.setItem(response.data);
            }
          })
          .catch((e: AxiosError<ErrorResponse>) => {
            console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
          });
      })();
    });

    return {
      CategoryList
    };
  },
});
</script>

<style scoped>
#category-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
