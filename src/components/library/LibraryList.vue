<template>
  <article id="library-list">
    <LibraryModal :edit_state="edit_state" />
    <section class="library-item-wrap" v-if="store.items.list.length > 0">
      <LibraryItem
        :edit_state="edit_state"
        v-for="library in store.items.list"
          :key="library.id"
          :id="library.id"
          :title="library.title"
          :content="library.content"
          :updated_at="library.updated_at"
      />
    </section>
    <section v-else-if="store.firstLoaded.value && !store.isSearched()">
      <p class="empty-message">まずはライブラリを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryModal from '@/components/modal/LibraryModal.vue';
import LibraryItem from "@/components/library/LibraryItem.vue";
import { pagination } from "@/../config.json";
import { libraryApi } from '@/plugin/apis';

export default defineComponent({
  name: 'LibraryList',
  components: {
    LibraryModal,
    LibraryItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const store = inject('library');
    const dialogStore = inject('dialog');

    let edit_state = reactive({
      title: '',
      content: ''
    });

    interface LibraryResponse {
      data: []
    };
    interface ErrorResponse {
      error: string
    };

    let canLoadNext = true;
    let currentPage = 1;

    const api = libraryApi();
    const loadNext = async (): Promise<void> => {
      const response = await axios.get<LibraryResponse>(
        api.listUrl(user.value.sub, pagination.library.content_num, pagination.library.content_num * (currentPage -1))
      );
      if (response.data.next === null) {
        canLoadNext = false;
      }
      store.concat(response.data.results);
    };

    const showMoreLibraryList = (event): void => {
      // 下限まで一定距離になったら自動読み込み
      if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 500 && canLoadNext && !store.isSearched()) {
        currentPage++;
        loadNext();
      }
    };

    onMounted(() => {
      if (!isAuthenticated || !user.value.sub) {
        location.href = window.location.origin;
      }

      // ライブラリ一覧に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
      document.documentElement.scrollTop = 0;

      const showLibraryList = async (): Promise<void> => {
        await axios.get<LibraryResponse>(api.listUrl(user.value.sub, pagination.library.content_num))
        .then((response: AxiosResponse) => {
          canLoadNext = (response.data.next !== null);
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          dialogStore.func.value('読み込みエラー', 'ライブラリ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
        });

        window.addEventListener("scroll", showMoreLibraryList, { passive: true });
      };

      showLibraryList();
    });

    onUnmounted(() => {
      store.allClear();
      store.restoreSearched();
      store.restoreFirstLoaded();
      window.removeEventListener('scroll', showMoreLibraryList, false);
    });

    return {
      edit_state,
      store
    };
  },
});
</script>

<style scoped>
.library-item-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.library-item-wrap::after {
  content: "";
  display: block;
  width: 30%;
  margin: 1rem;
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
  .library-item-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .library-item-wrap::after {
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
  .library-item-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .library-item-wrap::after {
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
