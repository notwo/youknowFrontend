<template>
  <section class="button">
    <button type="button" @click="onSubmit" :disabled="(v.title.$errors.length === 0 && state.title !== '') ? false : true">カテゴリ追加</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";

export default defineComponent({
  name: 'CategoryRegistrationFormButton',
  components: {},
  props: {
    state: Object,
    v: Object
  },
  setup(props, context) {
    const store = inject('category');

    interface UserResponse {
      data: {}
    };

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

    const uuid = window.localStorage.getItem(['UUID']);
    const username = window.localStorage.getItem(['USERNAME']);

    // あとで消す
    onMounted(() => {
      if (!uuid) {
        (async () => {
          await axios.get<UserResponse>('http://127.0.0.1:8000/api/users/', {
            params: { username: username }
          })
          .then((response: AxiosResponse) => {
            window.localStorage.setItem(['UUID'], response.data[0].uuid);
          })
          .catch((e: AxiosError<ErrorResponse>) => {
            console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
          });
        })();
      }
    });

    const route = useRoute();
    const onSubmit = async (event: HTMLButtonEvent) => {
      const requestParam: CategoryRequest = {
        custom_user: uuid,
        library: route.params.library_id,
        title: document.getElementById('category_title').value,
        content: document.getElementById('category_content').value
      };

      await axios.post(`http://127.0.0.1:8000/api/libraries/${route.params.library_id}/categories/`, requestParam)
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
    }
  }
});
</script>
