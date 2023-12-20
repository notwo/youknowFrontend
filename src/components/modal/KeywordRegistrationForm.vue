<template>
  <RegistrationForm
    :v="v"
    :state="state"
    contentType="keyword"
    contentName="キーワード"
    :titleMaxLength="50"
    :contentMaxLength="50"
    @click="onSubmit" />
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { keywordApi } from '@/plugin/apis';
import RegistrationForm from '@/components/modal/RegistrationForm.vue';

export default defineComponent({
  name: 'KeywordRegistrationForm',
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
    const store = inject('keyword');
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
      const requestParam: KeywordRequest = {
        custom_user: user.value.sub,
        library: route.params.library_id,
        category: route.params.category_id,
        title: document.getElementById('keyword_title').value,
        content: document.getElementById('keyword_content').value,
        tags: []
      };
      console.log(requestParam)

      axios.post(api.createUrl(user.value.sub, route.params.library_id, route.params.category_id), requestParam)
      .then((response: AxiosResponse) => {
        store.add(response.data);
        dialogStore.func.value('キーワード登録', `「${response.data.title}」を登録しました`);
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
