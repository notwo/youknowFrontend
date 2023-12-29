<script setup lang="ts">
import { reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryModal from '@/components/modal/CategoryModal.vue';
import CategoryItem from "@/components/category/CategoryItem.vue";
import { pagination } from "@/../config.json";
import { libraryApi, categoryApi } from '@/plugin/apis';

const { user, isAuthenticated } = useAuth0();
const store = inject('category');
const titlesStore = inject('titles');
const dialogStore = inject('dialog');

const edit_state = reactive({
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
const showMoreCategoryList = (event): void => {
  // 下限まで一定距離になったら自動読み込み
  if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 500 && canLoadNext && !store.isSearched()) {
    currentPage++;
    loadNext();
  }
};

const loadNext = async (): Promise<void> => {
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

  const showCategoryList = async (): Promise<void> => {
    await axios.get<CategoryResponse>(
      lApi.detailUrl(user.value.sub, route.params.library_id)
    )
      .then((response: AxiosResponse) => {
        canLoadNext = (response.data.paginated_categories.next);
        titlesStore.setLibrary(`「${response.data.title}」のカテゴリ`);
        store.setItem(response.data.paginated_categories.data);
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        dialogStore.func.value('読み込みエラー', 'カテゴリ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
      });

    window.addEventListener("scroll", showMoreCategoryList, { passive: true });
  };

  showCategoryList();
});

onUnmounted(() => {
  store.allClear();
  store.restoreSearched();
  store.restoreFirstLoaded();
  window.removeEventListener('scroll', showMoreCategoryList, false);
});
</script>

<style scoped>
.p-category__itemWrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.p-emptyMessage {
  font-size: 3.5rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-category__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-emptyMessage {
    margin: 2rem;
    font-size: 2rem;
    text-align: center;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-category__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-category__itemWrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .p-emptyMessage {
    margin: 2rem;
    font-size: 3rem;
    text-align: center;
  }
}
</style>

<template>
  <article id="category-list">
    <CategoryModal :edit_state="edit_state" />
    <section class="p-category__itemWrap" v-if="store.items.list.length > 0">
      <CategoryItem
        :edit_state="edit_state"
        v-for="category in store.items.list"
          :key="category.id"
          :id="category.id"
          :title="category.title"
          :content="category.content"
          :updated_at="category.updated_at"
      />
    </section>
    <section v-else-if="store.firstLoaded.value && !store.isSearched()">
      <p class="p-emptyMessage c-flex--center c-fadeIn--fast">カテゴリを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>
