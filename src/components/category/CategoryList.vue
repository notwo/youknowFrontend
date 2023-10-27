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
import { defineComponent, reactive, ref, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryModal from '@/components/modal/CategoryModal.vue';
import CategoryItem from "@/components/category/CategoryItem.vue";
import { pagination } from "@/../config.json";
import { categoryApi } from '@/plugin/apis';

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

    interface CategoryResponse {
      data: []
    };
    interface ErrorResponse {
      error: string
    };

    let canLoadNext = true;
    let currentPage = 1;

    const api = categoryApi();
    const route = useRoute();
    const showMoreCategoryList = (event) => {
      // 仮に下限まで残り100px程度になったら自動読み込み
      if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 100 && canLoadNext && !store.isSearched()) {
        currentPage++;
        loadNext();
      }
    };

    const loadNext = async () => {
      const response = await axios.get<CategoryResponse>(
        api.listUrl(user.value.sub, route.params.library_id, pagination.category.content_num, pagination.category.content_num * (currentPage -1))
      );
      if (response.data.next === null) {
        canLoadNext = false;
      }
      store.concat(response.data.results);
    };

    onMounted(() => {
      if (!isAuthenticated || !user.value.sub) {
        location.href = window.location.origin;
      }

      // カテゴリ一覧に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
      document.documentElement.scrollTop = 0;

      const showCategoryList = async () => {
        await axios.get<CategoryResponse>(api.listUrl(user.value.sub, route.params.library_id, pagination.category.content_num))
        .then((response: AxiosResponse) => {
          canLoadNext = (response.data.next !== null);
          CategoryList.value = response.data.results;
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
        });

        window.addEventListener("scroll", showMoreCategoryList, false);
      };

      showCategoryList();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', showMoreCategoryList, false);
    });

    return {
      edit_state,
      CategoryList
    };
  },
});
</script>

<style scoped>
.category-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
