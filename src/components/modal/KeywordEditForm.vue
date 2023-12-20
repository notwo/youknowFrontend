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

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { keywordApi } from '@/plugin/apis';
import EditForm from '@/components/modal/EditForm.vue';

export default defineComponent({
  name: 'KeywordEditForm',
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
    const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const requestParam: KeywordRequest = {
        custom_user: user.value.sub,
        title: document.getElementById('edit_keyword_title').value,
        content: document.getElementById('edit_keyword_content').value
      };

      axios.patch(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, editStore.id), requestParam)
        .then((response: AxiosResponse) => {
          store.update(response.data);
          dialogStore.func.value('', 'キーワード更新');
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
