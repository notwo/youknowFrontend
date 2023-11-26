<script setup lang="ts">
import { ref, reactive, inject, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from "@vuelidate/core";
import { registerRules } from '@/plugin/validatorMessage';
import { keywordApi, tagApi } from '@/plugin/apis';

const { user, isAuthenticated } = useAuth0();
const route = useRoute();
const store = inject('tag');
const api = {
  keyword: keywordApi(),
  tag: tagApi()
};

let register_state = reactive({
  title: '',
});

const register_v$ = useVuelidate(registerRules('タグ名'), register_state);

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


interface KeywordRequest {
  custom_user: String,
  tags: Array<Object>
};

const AttachTag = (tagId: Number) => {
  const requestParam: KeywordRequest = {
    custom_user: user.value.sub,
    tags: store.items.list.map((tag) =>
      {
        return { id: tag.id };
      }
    ).concat({ id: tagId })
  };

  axios.patch(api.keyword.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, route.params.keyword_id), requestParam)
    .then((response: AxiosResponse) => {
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
}

const addTag = (event: HTMLButtonEvent) => {
  const requestParam: TagRequest = {
    custom_user: user.value.sub,
    title: document.getElementById('tag_title').value,
    keyword_id: Number(route.params.keyword_id)
  };

  axios.post(api.tag.createUrl(user.value.sub), requestParam)
    .then((response: AxiosResponse) => {
      store.add(response.data);
      register_v$.value.$reset();
      register_state.title = '';
      AttachTag(response.data.id);
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
