<script setup lang="ts">
import { ref, reactive, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from "@vuelidate/core";
import { registerTagRules } from '@/plugin/validatorMessage';
import { tagApi } from '@/plugin/apis';
import { useAuth0 } from '@auth0/auth0-vue';

const { user, isAuthenticated } = useAuth0();
const route = useRoute();
const store = inject('tag');
const api = tagApi();

let register_state = reactive({
  title: '',
});

const register_v$ = useVuelidate(registerTagRules(), register_state);

interface ErrorResponse {
  message: String,
  name: String,
  code: String
};

interface TagRequest {
  custom_user: String,
  title: String,
  keyword_id: Number
};

const addTag = (event: HTMLButtonEvent) => {
  const requestParam: TagRequest = {
    custom_user: user.value.sub,
    title: document.getElementById('tag_title').value,
    keyword_id: Number(route.params.keyword_id)
  };

  axios.post(api.createUrl(user.value.sub), requestParam)
    .then((response: AxiosResponse) => {
      store.add(response.data);
      register_v$.value.$reset();
      register_state.title = '';
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
}

</script>

<style scoped>

</style>

<template>
  <section>
    <form action="" id="register-form">
      <input type="text" name="tag_title" id="tag_title"
        v-model="register_state.title"
        :error-messages="register_v$.title.$errors.map((e) => e.$message)"
        @blur="register_v$.title.$touch"
        @input="register_v$.title.$touch">
      <section v-for="error of register_v$.title.$errors" :key="error.$uid">
        <section class="error-message">{{ error.$message }}</section>
      </section>
      <button type="button" @click="addTag" :disabled="!(register_v$.title.$errors.length === 0 && register_state.title !== '')">タグ追加(後で修正)</button>
    </form>
  </section>
</template>
