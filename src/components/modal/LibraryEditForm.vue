<template>
  <section class="form-wrap">
    <section class="form-group">
      <label for="edit_library_title" class="required">ライブラリ名</label>
      <section class="form-field">
        <input type="text"
          :class="[v.title.$errors.length >= 1 ? 'error' : '']"
          v-model="state.title"
          id="edit_library_title"
          placeholder="ライブラリ名"
          maxlength="50"
          :error-messages="v.title.$errors.map((e) => e.$message)"
          @blur="v.title.$touch"
          @input="v.title.$touch">
        <section class="sub-text">
          <section v-for="error of v.title.$errors" :key="error.$uid">
            <section class="error-message">{{ error.$message }}</section>
          </section>
          <span class="count">{{ state.title.length }} / 50</span>
        </section>
      </section>
    </section>
    <section class="form-group">
      <label for="edit_library_content" class="">内容</label>
      <section class="form-field">
        <textarea v-model="state.content" id="edit_library_content" placeholder="ライブラリの内容" maxlength="50"></textarea>
        <section class="sub-text">
          <span class="count">{{ state.content.length }} / 50</span>
        </section>
      </section>
    </section>
    <section class="form-group">
      <section class="form-field">
        <button @click="onSubmit"
          :disabled="v.title.$errors.length !== 0 || state.title === ''"
          class="btn register">ライブラリを更新する</button>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, inject } from 'vue';
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
      message: String
      name: String
      code: String
    };

    interface LibraryRequest {
      custom_user: String
      title: String
      content: String
    };

    const api = libraryApi();
    const onSubmit = (event: HTMLButtonEvent) => {
      event.preventDefault();
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
.form-wrap {
  margin: 0 auto;
  max-width: 23rem;
}

.form-group {
  margin: 3rem 0;
}

label {
  display: block;
  margin: .75rem 0;
  font-size: 1.2rem;
  color: #666666;
  font-weight: 540;
}
label.required::after {
  position: relative;
  content: '必須';
  padding: .3rem;
  top: -.2rem;
  left: .6rem;
  font-size: .8rem;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  background-color: red;
}

#edit_library_title {
  padding: .6rem .8rem;
  width: 21rem;
  border-radius: .3rem;
  border: 2px solid #ddd;
}
#edit_library_title:focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

#edit_library_content {
  padding: .6rem .8rem;
  border: 2px solid #ddd;
  border-radius: .3rem;
  resize: none;
  width: 21rem;
  height: 10rem;
}
#edit_library_content:focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

input.error {
  border-color: rgba(220,0,0,0.3);
  background-color: rgba(220,0,0,0.3);
}
.error-message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

.sub-text {
  display: flex;
  justify-content: space-between;
}

.count {
  margin: 1rem .3rem 0 auto;
  right: .5rem;
  font-size: .9rem;
  color: #888;
}

.form-field .btn {
  display: block;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 800;
  color: gray;
}
.form-field .btn.register {
  border: none;
  background-color: rgba(17, 235, 17, 0.7);
}
.form-field .btn.register:hover {
  background-color: rgba(17, 235, 17,0.9);
}
.form-field .btn.disabled {
  background-color: rgba(150,150,150,0.8);
  pointer-events: none;
}
</style>
