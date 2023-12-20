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

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { libraryApi } from '@/plugin/apis';
import EditForm from '@/components/modal/EditForm.vue';

export default defineComponent({
  name: 'LibraryEditForm',
  components: {
    EditForm
  },
  props: {
    state: Object,
    v: Object
  },
  emits: ['closeEvent'],
  setup(props, context) {
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
    const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const requestParam: LibraryRequest = {
        custom_user: user.value.sub,
        title: document.getElementById('edit_library_title').value,
        content: document.getElementById('edit_library_content').value
      };

      axios.patch(api.detailUrl(user.value.sub, editStore.id), requestParam)
        .then((response: AxiosResponse) => {
          store.update(response.data);
          dialogStore.func.value('', 'ライブラリ更新');
          context.emit('closeEvent', event);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
        });
    };

    return {
      onSubmit
    };
  }
});

</script>

<style scoped>
</style>
