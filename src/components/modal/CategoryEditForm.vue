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

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { categoryApi } from '@/plugin/apis';
import EditForm from '@/components/modal/EditForm.vue';

export default defineComponent({
  name: 'CategoryEditForm',
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
    const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const requestParam: CategoryRequest = {
        custom_user: user.value.sub,
        library: route.params.library_id,
        title: document.getElementById('edit_category_title').value,
        content: document.getElementById('edit_category_content').value
      };

      axios.patch(api.detailUrl(user.value.sub, route.params.library_id, editStore.id), requestParam)
        .then((response: AxiosResponse) => {
          store.update(response.data);
          dialogStore.func.value('', 'カテゴリを更新しました');
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
