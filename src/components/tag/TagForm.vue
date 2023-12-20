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
const dialogStore = inject('dialog');

const api = {
  keyword: keywordApi(),
  tag: tagApi()
};

const register_state = reactive({
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

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const AttachTag = (tagId: Number): void => {
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

const addTag = (event: HTMLEvent<HTMLButtonElement>): void => {
  const requestParam: TagRequest = {
    custom_user: user.value.sub,
    title: document.getElementById('tag_title').value,
    keyword_id: Number(route.params.keyword_id)
  };

  axios.post(api.tag.createUrl(user.value.sub), requestParam)
    .then((response: AxiosResponse) => {
      store.add(response.data);
      dialogStore.func.value('タグ登録', `「${response.data.title}」を登録しました`);
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
.form-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.form-group {
  margin: 0 .3rem;
}

.tag-title {
  padding: .47rem;
}

.error-message-wrap {
  display: flex;
  justify-content: center;
}
.error-message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

</style>

<template>
  <form action="" id="register-form">
    <section class="form-wrap">
      <section class="form-group">
        <section class="form-field">
          <input type="text" class="tag-title" name="tag_title" id="tag_title"
            :class="[register_v$.title.$errors.length >= 1 ? 'error' : '']"
            v-model="register_state.title"
            :error-messages="register_v$.title.$errors.map((e) => e.$message)"
            :maxlength="50"
            @blur="register_v$.title.$touch"
            @input="register_v$.title.$touch">
        </section>
      </section>
      <section class="form-group">
        <section class="form-field">
          <button type="button"
          class="btn register"
          @click="addTag"
          :disabled="!(register_v$.title.$errors.length === 0 && register_state.title !== '')">このキーワードにタグを追加</button>
        </section>
      </section>
    </section>
    <section class="error-message-wrap" v-for="error of register_v$.title.$errors" :key="error.$uid">
      <section class="error-message">{{ error.$message }}</section>
    </section>
  </form>
</template>
