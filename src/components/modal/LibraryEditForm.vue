<template>
  <label for="edit_library_title" class="required">ライブラリ名</label>
  <section class="form-field">
    <input type="text"
      :class="[v.title.$errors.length >= 1 ? 'error' : '']"
      v-model="state.title"
      id="edit_library_title"
      placeholder="ライブラリ名"
      :error-messages="v.title.$errors.map((e) => e.$message)"
      @blur="v.title.$touch"
      @input="v.title.$touch">
    <section v-for="error of v.title.$errors" :key="error.$uid">
      <section class="error-message">{{ error.$message }}</section>
    </section>
  </section>
  <label for="edit_library_content" class="">内容</label>
  <section class="form-field">
    <textarea v-model="state.content" id="edit_library_content" placeholder="ライブラリの内容"></textarea>
  </section>
  <section class="button">
    <button type="button" @click="onSubmit" :disabled="!(v.title.$errors.length === 0 && state.title !== '')">ライブラリを更新する</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { libraryApi } from '@/plugin/apis';

export default defineComponent({
  name: 'LibraryEditForm',
  components: {},
  props: {
    state: Object,
    v: Object
  },
  emits: ['closeEvent'],
  setup(props, context) {
    const { user } = useAuth0();
    const store = inject('library');
    const editStore = inject('libraryEdit');

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
        title: document.getElementById('edit_library_title').value,
        content: document.getElementById('edit_library_content').value
      };

      axios.patch(api.detailUrl(user.value.sub, editStore.id), requestParam)
      .then((response: AxiosResponse) => {
        store.update(response.data);
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

#edit_library_content {
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
