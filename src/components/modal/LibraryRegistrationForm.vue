<template>
  <section class="form-wrap">
    <label for="library_title" class="required">ライブラリ名</label>
    <section class="form-field">
      <input type="text"
        :class="[v.title.$errors.length >= 1 ? 'error' : '']"
        v-model="state.title"
        id="library_title"
        placeholder="ライブラリ名"
        :error-messages="v.title.$errors.map((e) => e.$message)"
        @blur="v.title.$touch"
        @input="v.title.$touch">
      <section v-for="error of v.title.$errors" :key="error.$uid">
        <section class="error-message">{{ error.$message }}</section>
      </section>
    </section>
    <label for="library_content" class="">内容</label>
    <section class="form-field">
      <textarea v-model="state.content" id="library_content" placeholder="ライブラリの内容"></textarea>
    </section>
    <section class="button">
      <button type="button" @click="onSubmit" :disabled="(v.title.$errors.length === 0 && state.title !== '') ? false : true">ライブラリ追加</button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { libraryApi } from '@/plugin/apis';

export default defineComponent({
  name: 'LibraryRegistrationForm',
  components: {},
  props: {
    v: Object,
    state: Object
  },
  emits: ['closeEvent'],
  setup(props, context) {
    const { user } = useAuth0();
    const store = inject('library');

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

    const api = libraryApi();
    const onSubmit = (event: HTMLButtonEvent) => {
      const requestParam: LibraryRequest = {
        custom_user: user.value.sub,
        title: document.getElementById('library_title').value,
        content: document.getElementById('library_content').value
      };

      axios.post(api.createUrl(user.value.sub), requestParam)
      .then((response: AxiosResponse) => {
        store.add(response.data);
        context.emit('closeEvent', event);
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    return {
      onSubmit,
    };
  }
});
</script>

<style scoped>
.form-wrap {
  margin: 0 auto;
  max-width: 20rem;
}

label {
  margin: 2rem 0;
  font-size: 1.5em;
}
label.required::after {
  position: relative;
  content: '必須';
  padding: .3rem;
  top: -2px;
  left: 5px;
  font-size: .6rem;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  background-color: red;
}

#library_content {
  resize: none;
  width: 20em;
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
