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

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { categoryApi } from '@/plugin/apis';
import RegistrationForm from '@/components/modal/RegistrationForm.vue';

export default defineComponent({
  name: 'CategoryRegistrationForm',
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
    const store = inject('category');

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
    const onSubmit = (event: HTMLEvent<HTMLButtonElement>) => {
      const requestParam: CategoryRequest = {
        custom_user: user.value.sub,
        library: route.params.library_id,
        title: document.getElementById('category_title').value,
        content: document.getElementById('category_content').value
      };

      axios.post(api.createUrl(user.value.sub, route.params.library_id), requestParam)
      .then((response: AxiosResponse) => {
        store.add(response.data);
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
