<script setup lang="ts">
import { reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryModal from '@/components/modal/LibraryModal.vue';
import LibraryEditModal from '@/components/modal/LibraryEditModal.vue';
import LibraryItem from "@/components/library/LibraryItem.vue";
import { pagination } from "@/../config.json";
import { libraryApi } from '@/plugin/apis';

const { user, isAuthenticated } = useAuth0();
const store = inject('library');
const dialogStore = inject('dialog');
const loadingStore = inject('loading');

const edit_state = reactive({
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

const hideLoadNextBase = (): void => {
  const loadNextBase = document.querySelector('.js-loadNextBase') as HTMLElement;
  loadNextBase.classList.remove('js-open');
  loadingStore.hide.value();
};

const showLoadNextBase = (): void => {
  const loadNextBase = document.querySelector('.js-loadNextBase') as HTMLElement;
  loadNextBase.classList.add('js-open');
  loadingStore.show.value();
};

const api = libraryApi();
const loadNext = async (): Promise<void> => {
  const response = await axios.get<LibraryResponse>(
    api.listUrl(user.value.sub, pagination.library.content_num, pagination.library.content_num * (currentPage -1))
  );
  if (response.data.next === null) {
    canLoadNext = false;
  }
  store.concat(response.data.results);
  hideLoadNextBase();
};

const showMoreLibraryList = (event): void => {
  // 下限まで一定距離になったら自動読み込み
  if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 500 && canLoadNext && !store.isSearched()) {
    currentPage++;
    showLoadNextBase();
    loadNext();
  }
};

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

  // ライブラリ一覧に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
  document.documentElement.scrollTop = 0;

  loadingStore.show.value();

  store.allClear();
  store.restoreSearched();
  const showLibraryList = async (): Promise<void> => {
    await axios.get<LibraryResponse>(api.listUrl(user.value.sub, pagination.library.content_num))
      .then((response: AxiosResponse) => {
        canLoadNext = (response.data.next !== null);
        store.setItem(response.data.results);
        loadingStore.hide.value();
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
  store.restoreFirstLoaded();
  window.removeEventListener('scroll', showMoreLibraryList, false);
});
</script>

<style scoped>
.p-library__itemWrap {
}
.p-library__itemWrap::after {
  content: "";
  display: block;
  width: 30%;
  margin: 1rem;
}

.p-loadNextBase {
  display: none;
  margin: 0 auto;
  width: 100%;
}
.p-loadNextBase.js-open {
  display: block;
}

.p-emptyMessage {
  font-size: 3.5rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-library__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-library__itemWrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .p-emptyMessage {
    margin: 2rem;
    font-size: 2rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-library__itemWrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .p-library__itemWrap::after {
    content: "";
    display: block;
    width: 80%;
  }

  .p-emptyMessage {
    margin: 2rem;
    font-size: 3rem;
  }
}
</style>

<template>
  <article id="library-list">
    <LibraryModal />
    <LibraryEditModal :edit_state="edit_state" />

    <section class="p-library__itemWrap c-flex--spaceBetween c-flex--wrap" v-if="store.items.list.length > 0">
      <LibraryItem
        :edit_state="edit_state"
        v-for="library in store.items.list"
          :key="library.id"
          :id="library.id"
          :title="library.title"
          :content="library.content"
          :updated_at="library.updated_at"
      />
      <section class="js-loadingBase js-loadNextBase p-loadNextBase"></section>
    </section>
    <section v-else-if="store.firstLoaded.value && !store.isSearched()">
      <p class="p-emptyMessage c-flex--center c-fadeIn--fast c-text--center">まずはライブラリを追加してみましょう</p>
    </section>
    <section v-else-if="!store.firstLoaded.value" class="js-loadingBase">
      <!-- ここにローディング -->
    </section>
  </article>
</template>
