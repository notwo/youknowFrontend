<template>
  <article id="keyword-list">
    <KeywordModal :edit_state="edit_state" />
    <section class="keyword-item-wrap" v-if="store.items.list.length > 0">
      <KeywordItem
        :edit_state="edit_state"
        v-for="keyword in store.items.list"
          :key="keyword.id"
          :id="keyword.id"
          :title="keyword.title"
          :content="keyword.content"
          :custom_user="keyword.custom_user"
          :custom_user_id="keyword.custom_user_id"
          :created_at="keyword.created_at"
          :updated_at="keyword.updated_at"
          :tags="keyword.tags"
      />
    </section>
    <section v-else-if="store.firstLoaded.value && !store.isSearched()">
      <p class="empty-message">キーワードを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordModal from '@/components/modal/KeywordModal.vue';
import KeywordItem from "@/components/keyword/KeywordItem.vue";
import { pagination } from "@/../config.json";
import { categoryApi, keywordApi } from '@/plugin/apis';

export default defineComponent({
  name: 'KeywordList',
  components: {
    KeywordModal,
    KeywordItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const store = inject('keyword');
    const titlesStore = inject('titles');
    const dialogStore = inject('dialog');

    let edit_state = reactive({
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

    const showMoreKeywordList = (event) => {
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

    return {
      edit_state,
      store
    };
  }
});
</script>

<style scoped>
.keyword-item-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.empty-message {
  display: flex;
  justify-content: center;
  font-size: 3.5rem;
  animation: fadeIn .3s ease;
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

/* sp */
@media screen and (max-width: 414px) {
  .keyword-item-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .keyword-item-wrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .empty-message {
    margin: 2rem;
    font-size: 2rem;
    text-align: center;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .keyword-item-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .keyword-item-wrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .empty-message {
    margin: 2rem;
    font-size: 3rem;
    text-align: center;
  }
}
</style>
