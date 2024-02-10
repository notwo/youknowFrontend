<script setup lang="ts">
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { keywordApi } from '@/plugin/apis';
import EditForm from '@/components/modal/EditForm.vue';

defineProps({
  v: Object,
  state: Object,
})
const emits = defineEmits<{(e: 'closeEvent', event: Object): void}>();

const { user } = useAuth0();
const store = inject('keyword');
const editStore = inject('keywordEdit');
const dialogStore = inject('dialog');

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface KeywordRequest {
  custom_user: String,
  title: String
  content: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const api = keywordApi();
const route = useRoute();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>, title: String, content: String): void => {
  event.preventDefault();
  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    title: title,
    content: content
  };

  axios.patch(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, editStore.id), requestParam)
    .then((response: AxiosResponse) => {
      store.update(response.data);
      dialogStore.func.value('', 'キーワードを更新しました');
      emits('closeEvent', event);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('更新エラー', 'キーワード更新中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
</style>

<template>
  <EditForm
    :v="v"
    :state="state"
    contentType="keyword"
    contentName="キーワード"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>
