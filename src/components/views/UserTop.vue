<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useVuelidate } from "@vuelidate/core";
import { editUserRules } from '@/plugin/validatorMessage';
import { userApi } from '@/plugin/apis';
import BackButton from '@/components/common/BackButton.vue';

const auth0 = useAuth0();

const edit_state = reactive({
  username: auth0?.user?.value?.nickname,
  email: auth0?.user?.value?.email
});

const editStore = reactive({
  username: String,
  email: String
});

const userAttr = reactive({
  username: true,
  email: true
});

const edit_v$ = useVuelidate(editUserRules(editStore, userAttr), edit_state);

const store = inject('user');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

interface UserRequest {
  username: String
  email: String
};
interface ErrorResponse {
  username: String
  email: String
};

const api = userApi();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
  const requestParam: UserRequest = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value
  };

  axios.patch(api.detailUrl(store.uuid.value), requestParam)
    .then((response: AxiosResponse) => {
      editStore.username = response.data.username;
      editStore.email = response.data.email;
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
};

if (store.uuid.value === '') {
  axios.get(`${api.detailBySubUrl(auth0?.user?.value?.sub)}`)
    .then((response: AxiosResponse) => {
      store.setUserId(response.data[0].id);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
    });
}

onMounted(() => {
  editStore.username = auth0?.user?.value?.nickname;
  editStore.email = auth0?.user?.value?.email;
});
</script>

<style scoped>
.page-title {
  margin: .2rem .9rem;
  font-size: 2rem;
  text-align: center;
}

.form-wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 5rem;
}

.form-group {
  margin: 1.3rem 0;
}

label {
  display: block;
  margin: .75rem 0;
  font-size: 1.2rem;
  color: #333333;
  font-weight: 540;
}

input[type="text"] {
  padding: .6rem .8rem;
  width: 20rem;
  border-radius: .3rem;
  border: 2px solid #ddd;
}
input[type="text"]:focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

input[type="email"] {
  padding: .6rem .8rem;
  width: 30rem;
  border-radius: .3rem;
  border: 2px solid #ddd;
}
input[type="email"]:focus {
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

button[type="button"] {
  font-size: 1.2rem;
}
</style>

<template>
  <BackButton />
  <!-- TODO: ここにユーザプロフィール画像を載せられるようにする -->
  <section class="page-title">ユーザ情報の更新</section>
  <section class="profile">
    <section class="prof-content">
      <section class="prof-image"></section>
      <form action="">
        <section class="form-wrap">
          <section class="form-group">
            <label for="username" class="required">ユーザ名</label>
            <section class="form-field">
              <input type="text"
                :class="[edit_v$.username.$errors.length >= 1 ? 'error' : '']"
                v-model="edit_state.username"
                id="username"
                name="username"
                placeholder="ユーザ名"
                maxlength="50"
                :error-messages="edit_v$.username.$errors.map((e) => e.$message)"
                @blur="edit_v$.username.$touch"
                @input="edit_v$.username.$touch">
              <section class="sub-text">
                <section v-for="error of edit_v$.username.$errors" :key="error.$uid">
                  <section class="error-message">{{ error.$message }}</section>
                </section>
                <span class="count">{{ edit_state.username.length }} / 50</span>
              </section>
            </section>
          </section>
          <section class="form-group">
            <label for="email" class="required">メールアドレス</label>
            <section class="form-field">
              <input type="email"
                :class="[edit_v$.email.$errors.length >= 1 ? 'error' : '']"
                v-model="edit_state.email"
                id="email"
                name="email"
                placeholder="メールアドレス"
                maxlength="150"
                :error-messages="edit_v$.email.$errors.map((e) => e.$message)"
                @blur="edit_v$.email.$touch"
                @input="edit_v$.email.$touch">
            </section>
            <section class="sub-text">
              <section v-for="error of edit_v$.email.$errors" :key="error.$uid">
                <section class="error-message">{{ error.$message }}</section>
              </section>
              <span class="count">{{ edit_state.email.length }} / 150</span>
            </section>
          </section>
          <section class="form-group">
            <section class="form-field">
              <button type="button"
                @click="onSubmit"
                :disabled="!(
                  (edit_v$.username.$errors.length === 0 && edit_state.username !== '') &&
                  (edit_v$.email.$errors.length === 0 && edit_state.email !== '')
                )"
                class="btn register">ユーザ情報を更新する</button>
            </section>
          </section>
        </section>
      </form>
    </section>
  </section>
</template>
