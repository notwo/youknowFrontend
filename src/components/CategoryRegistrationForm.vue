<template>
  <form action="">
    <span id="close" class="close" @click="closeModal"></span>
    <label for="category_title" class="required">カテゴリ名</label>
    <section class="form-field">
      <input type="text"
        :class="[v$.title.$errors.length >= 1 ? 'error' : '']"
        v-model="state.title"
        id="category_title"
        placeholder="新規カテゴリ名"
        :error-messages="v$.title.$errors.map((e) => e.$message)"
        @blur="v$.title.$touch"
        @input="v$.title.$touch">
      <section v-for="error of v$.title.$errors" :key="error.$uid">
        <section class="error-message">{{ error.$message }}</section>
      </section>
    </section>
    <label for="category_content" class="">内容</label>
    <section class="form-field">
      <textarea v-model="state.content" id="category_content" placeholder="新規カテゴリの内容"></textarea>
    </section>
    <section class="button">
      <button type="button" @click="onSubmit" :disabled="(v$.title.$errors.length === 0 && state.title !== '') ? false : true">カテゴリ追加</button>
    </section>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { requiredMsg, duplicateMsg } from '@/plugin/validatorMessage';

export default defineComponent({
  name: 'CategoryRegistrationForm',
  components: {},
  setup() {
    const store = inject('category');

    let state = reactive({
      title: '',
      content: ''
    });

    const rules = {
      title: {
        required: helpers.withMessage(requiredMsg('カテゴリ名'), required),
        duplicated: helpers.withMessage(duplicateMsg('カテゴリ名'), function (val: String) {
          // API経由で結果を返却させるように後で修正
          const _titles = document.getElementsByClassName('title');
          if (_titles.length <= 0) { return true; }
          const _target = Array.from(_titles).find((element) => element.innerText === val);
          return !_target;
        })
      }
    };

    const v$ = useVuelidate(rules, state);

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

    // ----------------------- events -----------------------
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
        closeModal(event);
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    };

    const closeModal = (event: HTMLButtonEvent) => {
      event.preventDefault();
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.remove('visible');
      // フォーム初期化
      state.title = '';
      state.content = '';
      v$.value.$reset();
    };

    return {
      v$,
      state,
      onSubmit,
      closeModal,
    };
  }
});
</script>

<style scoped>

.modal .close {
  display: block;
  position: relative;
  width: 2em;
  height: 2em;
  margin-left: auto;
}
.modal .close::before, .modal .close::after {
  display: block;
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  top: 50%;
  left: 50%;
  background-color: black;
}
.modal .close::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.modal .close::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}

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
