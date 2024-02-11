<script setup lang="ts">
import { inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { libraryApi } from '@/plugin/apis';
import EditForm from '@/components/modal/form/edit/EditForm.vue';

defineProps({
  v: Object,
  state: Object,
});
const emits = defineEmits<{(e: 'closeEvent', event: Object): void}>();

const { user } = useAuth0();
const store = inject('library');
const editStore = inject('libraryEdit');
const dialogStore = inject('dialog');

interface ErrorResponse {
  message: String
  name: String
  code: String
};

interface LibraryRequest {
  custom_user: String
  title: String
  content: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const api = libraryApi();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>, title: String, content: String): void => {
  event.preventDefault();
  const requestParam: LibraryRequest = {
    custom_user: user.value.sub,
    title: title,
    content: content
  };

  axios.patch(api.detailUrl(user.value.sub, editStore.id), requestParam)
    .then((response: AxiosResponse) => {
      store.update(response.data);
      dialogStore.func.value('', 'ライブラリを更新しました');
      emits('closeEvent', event);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('更新エラー', 'ライブラリ更新中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

</script>

<style scoped>
</style>

<template>
  <EditForm
    :v="v"
    :state="state"
    contentType="library"
    contentName="ライブラリ"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>
