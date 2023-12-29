<script setup lang="ts">
import { reactive, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from "@vuelidate/core";
import { registerRules } from '@/plugin/validatorMessage';
import { keywordApi, tagApi } from '@/plugin/apis';

const { user } = useAuth0();
const route = useRoute();
const store = inject('tag');
const dialogStore = inject('dialog');

const screenWidth = window.screen.width;

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
      dialogStore.func.value('タグ適用エラー', 'タグ適用に失敗しました。暫くお待ちいただいてから再度お試しください', 'error');
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
      dialogStore.func.value('タグ登録エラー', 'タグ登録に失敗しました。暫くお待ちいただいてから再度お試しください', 'error');
    });
}

</script>

<style scoped>
.p-formWrap {
  flex-wrap: wrap;
}

.p-form__group {
  margin: 0 .3rem;
}

.p-tag__title {
  padding: .47rem;
}

.p-error__message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

/* sp */
@media screen and (max-width: 414px) {
  .p-formWrap {
    flex-direction: column;
    align-items: center;
  }

  .p-form__group {
    margin: .8rem .3rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
}
</style>

<template>
  <form action="" id="p-registerForm">
    <section class="p-formWrap c-flex--center">
      <section class="p-form__group">
        <section class="p-form__field">
          <input type="text" class="p-tag__title" name="tag_title" id="tag_title"
            :class="[register_v$.title.$errors.length >= 1 ? 'error' : '']"
            v-model="register_state.title"
            :error-messages="register_v$.title.$errors.map((e) => e.$message)"
            :maxlength="50"
            @blur="register_v$.title.$touch"
            @input="register_v$.title.$touch">
        </section>
        <section v-if="screenWidth < 416">
          <section class="p-error__messageWrap c-flex--center" v-for="error of register_v$.title.$errors" :key="error.$uid">
            <p class="p-error__message">{{ error.$message }}</p>
          </section>
        </section>
      </section>
      <section class="p-form__group">
        <section class="p-form__field">
          <button type="button"
          class="c-btn c-btn--register"
          @click="addTag"
          :disabled="!(register_v$.title.$errors.length === 0 && register_state.title !== '')">このキーワードにタグを追加</button>
        </section>
      </section>
    </section>
    <section v-if="screenWidth >= 416">
      <section class="p-error__messageWrap c-flex--center" v-for="error of register_v$.title.$errors" :key="error.$uid">
        <p class="p-error__message">{{ error.$message }}</p>
      </section>
    </section>
  </form>
</template>
