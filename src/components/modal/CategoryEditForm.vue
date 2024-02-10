<script setup lang="ts">
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { categoryApi } from '@/plugin/apis';
import EditForm from '@/components/modal/EditForm.vue';

defineProps({
  v: Object,
  state: Object,
})
const emits = defineEmits<{(e: 'closeEvent', event: Object): void}>();
const { user } = useAuth0();
const store = inject('category');
const editStore = inject('categoryEdit');
const dialogStore = inject('dialog');

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface CategoryRequest {
  custom_user: String,
  title: String
  content: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const api = categoryApi();
const route = useRoute();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>, title: String, content: String): void => {
  event.preventDefault();
  const requestParam: CategoryRequest = {
    custom_user: user.value.sub,
    library: route.params.library_id,
    title: title,
    content: content
  };

  axios.patch(api.detailUrl(user.value.sub, route.params.library_id, editStore.id), requestParam)
    .then((response: AxiosResponse) => {
      store.update(response.data);
      dialogStore.func.value('', 'カテゴリを更新しました');
      emits('closeEvent', event);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('更新エラー', 'カテゴリ更新中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
</style>

<template>
  <EditForm
    :v="v"
    :state="state"
    contentType="category"
    contentName="カテゴリ"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>
