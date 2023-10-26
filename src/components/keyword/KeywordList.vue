<template>
  <article id="keyword-list">
    <KeywordModal :edit_state="edit_state" />
    <section class="keyword-item">
      <KeywordItem
        :edit_state="edit_state"
        v-for="keyword in KeywordList"
        :key="keyword.id"
        :id="keyword.id"
        :title="keyword.title"
        :content="keyword.content"
        :custom_user="keyword.custom_user"
        :custom_user_id="keyword.custom_user_id"
        :created_at="keyword.created_at"
        :updated_at="keyword.updated_at"
      />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordModal from '@/components/modal/KeywordModal.vue';
import KeywordItem from "@/components/keyword/KeywordItem.vue";
import { pagination } from "@/../config.json";
import { keywordListUrl } from '@/plugin/apis';

export default defineComponent({
  name: 'KeywordList',
  components: {
    KeywordModal,
    KeywordItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const KeywordList = ref([]);
    const store = inject('keyword');

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

    const route = useRoute();
    const showMoreKeywordList = (event) => {
      // 仮に下限まで残り100px程度になったら自動読み込み
      if (document.body.scrollHeight - document.body.clientHeight - window.scrollY <= 100 && canLoadNext && !store.isSearched()) {
        currentPage++;
        loadNext();
      }
    };

    const loadNext = async () => {
      const response = await axios.get<KeywordResponse>(
        keywordListUrl(user.value.sub, route.params.library_id, route.params.category_id, pagination.keyword.content_num, pagination.keyword.content_num * (currentPage -1))
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

      const showKeywordList = async () => {
        await axios.get<KeywordResponse>(keywordListUrl(user.value.sub, route.params.library_id, route.params.category_id, pagination.keyword.content_num))
        .then((response: AxiosResponse) => {
          canLoadNext = (response.data.next !== null);
          KeywordList.value = response.data.results;
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
        });

        window.addEventListener("scroll", showMoreKeywordList, false);
      };

      showKeywordList();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', showMoreKeywordList, false);
    });

    return {
      edit_state,
      KeywordList
    };
  }
});
</script>

<style scoped>
.keyword-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
