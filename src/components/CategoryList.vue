<template>
  <article id="category-list">
    <CategoryModal :edit_state="edit_state" />
    <section class="category-item">
      <CategoryItem
        :edit_state="edit_state"
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
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryModal from '@/components/modal/CategoryModal.vue';
import CategoryItem from "@/components/CategoryItem.vue";

export default defineComponent({
  name: 'CategoryList',
  components: {
    CategoryModal,
    CategoryItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const CategoryList = ref([]);
    const store = inject('category');

    let edit_state = reactive({
      title: '',
      content: ''
    });

    const route = useRoute();
    onMounted(() => {
      if (!isAuthenticated || !user.value.sub) {
        location.href = window.location.origin;
      }

      interface CategoryResponse {
        data: []
      };
      interface ErrorResponse {
        error: string
      };

      axios.get<CategoryResponse>(`${import.meta.env.VITE_API_URL}/api/users/${user.value.sub}/libraries/${route.params.library_id}/categories/?limit=15&offset=0`)
        .then((response: AxiosResponse) => {
          CategoryList.value = response.data.results;
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
        });
    });

    return {
      edit_state,
      CategoryList
    };
  },
});
</script>

<style scoped>
.category-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
