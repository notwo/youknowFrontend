<script setup lang="ts">
import { inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute, } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { searchApi } from '@/plugin/apis';
import SearchForm from "@/components/common/SearchForm.vue";

const { user } = useAuth0();
const route = useRoute();
const dialogStore = inject('dialog');

const props = defineProps({
  contentType: String,
  contentName: String,
});

const store = inject(props.contentType);

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const emits = defineEmits<{(e: 'closeEvent', event: HTMLEvent<HTMLButtonElement>): void}>();

const onSearch = (event: HTMLEvent<HTMLButtonElement>, searchType: String, title: String): void => {
  if (title === '') {
    store.allClear();
    store.restore();
    emits('closeEvent', event);
    return;
  }

  const url = searchApi().urlBySearchType(user, title, props.contentType, Number(searchType), route) as String;

  axios.get(url)
    .then((response: AxiosResponse) => {
      // 検索後は一括で結果を返すようにしておく。今後検索後に対してもページングする場合はコメントアウトを外す(更にAPIの修正も必要)
      //if (response.data.results.length <= 0) {
      if (response.data.length <= 0) {
        store.search(response.data, searchType, title);
        emits('closeEvent', event);
        return;
      }
      //store.search(response.data.results);
      store.search(response.data, searchType, title);
      emits('closeEvent', event);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      store.allClear();
      emits('closeEvent', event);
      dialogStore.func.value('検索エラー', `${props.contentName}検索中にエラーが起きました。暫くお待ちいただいてから再度お試しください`, 'error');
    });
}
</script>

<style scoped>
</style>

<template>
  <SearchForm
    :contentName="props.contentName"
    @click="onSearch" />
</template>
