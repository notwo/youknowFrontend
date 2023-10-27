<template>
  <article id="library-list">
    <LibraryModal :edit_state="edit_state" />
    <section class="library-item">
      <LibraryItem
        :edit_state="edit_state"
        v-for="library in LibraryList"
        :key="library.id"
        :id="library.id"
        :title="library.title"
        :content="library.content"
        :custom_user="library.custom_user"
        :custom_user_id="library.custom_user_id"
        :created_at="library.created_at"
        :updated_at="library.updated_at"
      />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, inject } from 'vue';
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
    const LibraryList = ref([]);
    const store = inject('library');

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
    const loadNext = async () => {
      const response = await axios.get<LibraryResponse>(
        api.listUrl(user.value.sub, pagination.library.content_num, pagination.library.content_num * (currentPage -1))
      );
      if (response.data.next === null) {
        canLoadNext = false;
      }
      store.concat(response.data.results);
    };

    const showMoreLibraryList = (event) => {
      // 仮に下限まで残り100px程度になったら自動読み込み
      if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 100 && canLoadNext && !store.isSearched()) {
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

      const showLibraryList = async () => {
        await axios.get<LibraryResponse>(api.listUrl(user.value.sub, pagination.library.content_num))
        .then((response: AxiosResponse) => {
          canLoadNext = (response.data.next !== null);
          LibraryList.value = response.data.results;
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
        });

        window.addEventListener("scroll", showMoreLibraryList, false);
      };

      showLibraryList();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', showMoreLibraryList, false);
    });

    return {
      edit_state,
      LibraryList
    };
  },
});
</script>

<style scoped>
.library-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

</style>
