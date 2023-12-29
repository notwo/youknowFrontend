<script setup lang="ts">
import { reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordModal from '@/components/modal/KeywordModal.vue';
import KeywordItem from "@/components/keyword/KeywordItem.vue";
import { pagination } from "@/../config.json";
import { categoryApi, keywordApi } from '@/plugin/apis';

const { user, isAuthenticated } = useAuth0();
const store = inject('keyword');
const titlesStore = inject('titles');
const dialogStore = inject('dialog');

const edit_state = reactive({
  title: '',
  content: ''
});

interface KeywordResponse {
  data: []
};
interface ErrorResponse {
  error: string
};

let canLoadNext = true;
let currentPage = 1;

const api = keywordApi();
const cApi = categoryApi();
const route = useRoute();

const showMoreKeywordList = (event): void => {
  // 下限まで一定距離になったら自動読み込み
  if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 500 && canLoadNext && !store.isSearched()) {
    currentPage++;
    loadNext();
  }
};

const loadNext = async (): Promise<void> => {
  const response = await axios.get<KeywordResponse>(
    api.listUrl(user.value.sub, route.params.library_id, route.params.category_id, pagination.keyword.content_num, pagination.keyword.content_num * (currentPage -1))
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

  // キーワード一覧に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
  document.documentElement.scrollTop = 0;

  const showKeywordList = async (): Promise<void> => {
    await axios.get<KeywordResponse>(
      cApi.detailUrl(user.value.sub, route.params.library_id, route.params.category_id)
    )
    .then((response: AxiosResponse) => {
      canLoadNext = (response.data.paginated_keywords.next);
      titlesStore.setLibrary(`「${response.data.library_title}」のカテゴリ`);
      titlesStore.setCategory(`「${response.data.title}」のキーワード`);
      store.setItem(response.data.paginated_keywords.data);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('読み込みエラー', 'キーワード読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });

    window.addEventListener("scroll", showMoreKeywordList, { passive: true });
  };

  showKeywordList();
});

onUnmounted(() => {
  store.allClear();
  store.restoreSearched();
  store.restoreFirstLoaded();
  window.removeEventListener('scroll', showMoreKeywordList, false);
});
</script>

<style scoped>
.p-keyword__itemWrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.p-emptyMessage {
  font-size: 3.5rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-keyword__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-keyword__itemWrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .p-emptyMessage {
    margin: 2rem;
    font-size: 2rem;
    text-align: center;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-keyword__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-keyword__itemWrap::after {
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
  <article id="keyword-list">
    <KeywordModal :edit_state="edit_state" />
    <section class="p-keyword__itemWrap" v-if="store.items.list.length > 0">
      <KeywordItem
        :edit_state="edit_state"
        v-for="keyword in store.items.list"
          :key="keyword.id"
          :id="keyword.id"
          :title="keyword.title"
          :content="keyword.content"
          :updated_at="keyword.updated_at"
          :tags="keyword.tags"
      />
    </section>
    <section v-else-if="store.firstLoaded.value && !store.isSearched()">
      <p class="p-emptyMessage c-flex--center c-fadeIn--fast">キーワードを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>
