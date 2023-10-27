<template>
  <section class="form-wrap">
    <label for="category_title" class="required">カテゴリ名</label>
    <section class="form-field">
      <input type="text"
        :class="[v.title.$errors.length >= 1 ? 'error' : '']"
        v-model="state.title"
        id="category_title"
        placeholder="カテゴリ名"
        :error-messages="v.title.$errors.map((e) => e.$message)"
        @blur="v.title.$touch"
        @input="v.title.$touch">
      <section v-for="error of v.title.$errors" :key="error.$uid">
        <section class="error-message">{{ error.$message }}</section>
      </section>
    </section>
    <label for="category_content" class="">内容</label>
    <section class="form-field">
      <textarea v-model="state.content" id="category_content" placeholder="カテゴリの内容"></textarea>
    </section>
    <section class="button">
      <button type="button" @click="onSubmit" :disabled="!(v.title.$errors.length === 0 && state.title !== '')">カテゴリを追加する</button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { categoryApi } from '@/plugin/apis';

export default defineComponent({
  name: 'CategoryRegistrationForm',
  components: {},
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

    const api = categoryApi();
    const route = useRoute();
    const onSubmit = (event: HTMLButtonEvent) => {
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
.modal label {
  font-size: 1.5em;
  font-weight: bold;
}
.modal label.required::after {
  position: relative;
  content: '必須';
  padding: 0.2em;
  top: -2px;
  left: 5px;
  font-size: 0.5em;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  background-color: red;
}

#category_content {
  resize: none;
  width: 40em;
  height: 10em;
}

input.error {
  border-color: rgba(220,0,0,0.3);
  background-color: rgba(220,0,0,0.3);
}


.error-message {
  color: rgba(220,0,0,0.3);
}
</style>
