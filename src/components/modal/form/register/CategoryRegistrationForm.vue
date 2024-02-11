<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { categoryApi } from '@/plugin/apis';
import RegistrationForm from '@/components/modal/form/register/RegistrationForm.vue';

defineProps({
  v: Object,
  state: Object,
});
const emits = defineEmits<{(e: 'closeEvent', event: Object): void}>();

const { user } = useAuth0();
const store = inject('category');
const dialogStore = inject('dialog');

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface CategoryRequest {
  custom_user: String,
  library: String,
  title: String
  content: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const api = categoryApi();
const route = useRoute();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>, title: String, content: String): void => {
  const requestParam: CategoryRequest = {
    custom_user: user.value.sub,
    library: route.params.library_id,
    title: title,
    content: content
  };

  axios.post(api.createUrl(user.value.sub, route.params.library_id), requestParam)
  .then((response: AxiosResponse) => {
    store.add(response.data);
    dialogStore.func.value('カテゴリ登録', `「${response.data.title}」を登録しました`);
    emits('closeEvent', event);
  })
  .catch((e: AxiosError<ErrorResponse>) => {
    dialogStore.func.value('登録エラー', 'カテゴリ登録中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
  });
};
</script>

<style scoped>
</style>

<template>
  <RegistrationForm
    :v="v"
    :state="state"
    contentType="category"
    contentName="カテゴリ"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>
