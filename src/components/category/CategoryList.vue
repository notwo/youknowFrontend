<template>
  <article id="category-list">
    <CategoryModal :edit_state="edit_state" />
    <section class="category-item-wrap" v-if="store.items.list.length > 0">
      <CategoryItem
        :edit_state="edit_state"
        v-for="category in store.items.list"
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
    <section v-else-if="store.firstLoaded.value">
      <p class="empty-message">カテゴリを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryModal from '@/components/modal/CategoryModal.vue';
import CategoryItem from "@/components/category/CategoryItem.vue";
import { pagination } from "@/../config.json";
import { libraryApi, categoryApi } from '@/plugin/apis';

export default defineComponent({
  name: 'CategoryList',
  components: {
    CategoryModal,
    CategoryItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const store = inject('category');
    const titlesStore = inject('titles');

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
    const lApi = libraryApi();
    const route = useRoute();
    const showMoreCategoryList = (event) => {
      // 下限まで一定距離になったら自動読み込み
      if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 500 && canLoadNext && !store.isSearched()) {
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
        await axios.get<CategoryResponse>(
          lApi.detailUrl(user.value.sub, route.params.library_id)
        )
        .then((response: AxiosResponse) => {
          canLoadNext = (response.data.paginated_categories.next);
          titlesStore.setLibrary(`「${response.data.title}」のカテゴリ`);
          store.setItem(response.data.paginated_categories.data);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
        });

        window.addEventListener("scroll", showMoreCategoryList, false);
      };

      showCategoryList();
    });

    onUnmounted(() => {
      store.allClear();
      store.restoreFirstLoaded();
      window.removeEventListener('scroll', showMoreCategoryList, false);
    });

    return {
      edit_state,
      store
    };
  },
});
</script>

<style scoped>
.category-item-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.empty-message {
  display: flex;
  justify-content: center;
  font-size: 3.5rem;
  animation: fadeIn .7s ease;
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
</style>
