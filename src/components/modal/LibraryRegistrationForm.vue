<template>
  <RegistrationForm
    :v="v"
    :state="state"
    contentType="library"
    contentName="ライブラリ"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { libraryApi } from '@/plugin/apis';
import RegistrationForm from '@/components/modal/RegistrationForm.vue';

export default defineComponent({
  name: 'LibraryRegistrationForm',
  components: {
    RegistrationForm
  },
  props: {
    v: Object,
    state: Object
  },
  emits: ['closeEvent'],
  setup(props, context) {
    const { user } = useAuth0();
    const store = inject('library');
    const dialogStore = inject('dialog');

    interface ErrorResponse {
      message: String,
      name: String,
      code: String
    };

    interface LibraryRequest {
      custom_user: String,
      title: String
      content: String
    };

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const api = libraryApi();
    const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
      const requestParam: LibraryRequest = {
        custom_user: user.value.sub,
        title: document.getElementById('library_title').value,
        content: document.getElementById('library_content').value
      };

      axios.post(api.createUrl(user.value.sub), requestParam)
        .then((response: AxiosResponse) => {
          store.add(response.data);
          dialogStore.func.value('ライブラリ登録', `「${response.data.title}」を登録しました`);
          context.emit('closeEvent', event);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          dialogStore.func.value('登録エラー', 'ライブラリ登録中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
        });
    };

    return {
      onSubmit,
    };
  }
});
</script>

<style scoped>
</style>
