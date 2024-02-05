<script setup lang="ts">
import { reactive, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { useVuelidate } from "@vuelidate/core";
import { editUserRules } from '@/plugin/validatorMessage';
import { userApi } from '@/plugin/apis';
import BackButton from '@/components/common/BackButton.vue';
import DeleteUserButton from '@/components/user/DeleteUserButton.vue';
import Dialog from '@/components/common/Dialog.vue';

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
const dialogStore = inject('dialog');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

interface UserRequest {
  username: String
  email: String
};
interface Auth0UserRequest {
  nickname: String
  email: String
};
interface ErrorResponse {
  username: String
  email: String
};

const api = userApi();
const updateToAuth0 = async (): Promise<void> => {
  const requestParam: Auth0UserRequest = {
    "nickname": editStore.username,
    "email": editStore.email,
  };
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": 'Bearer ' + import.meta.env.VITE_AUTH0_API_ACCESS_TOKEN
  };

  await axios.patch(api.auth0UserUrl(auth0?.user?.value?.sub), requestParam, { headers: headers })
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'ユーザ情報を更新しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('更新エラー', 'ユーザ情報更新中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
  const requestParam: UserRequest = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value
  };

  axios.patch(api.detailUrl(store.uuid.value), requestParam)
    .then((response: AxiosResponse) => {
      editStore.username = response.data.username;
      editStore.email = response.data.email;
      dialogStore.func.value('', 'ユーザ情報を更新しました');
      updateToAuth0();
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('更新エラー', 'ユーザ情報更新中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

// 手元のDBを更新するため、uuidを初回のみ取得する
if (store.uuid.value === '') {
  axios.get(`${api.detailBySubUrl(auth0?.user?.value?.sub)}`)
    .then((response: AxiosResponse) => {
      store.setUserId(response.data[0].id);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('読み込みエラー', 'ユーザ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
}

onMounted(() => {
  editStore.username = auth0?.user?.value?.nickname;
  editStore.email = auth0?.user?.value?.email;
});
</script>

<style scoped>
.p-pageTitle {
  margin: .2rem .9rem;
  font-size: 2rem;
}

.p-formWrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem 5rem;
}

.p-form__group {
  margin: 1.3rem 0;
}
.p-form__group.attention {
  margin: 2.3rem 0;
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
.p-error__message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

.p-count {
  margin: .8rem .3rem 0.8rem auto;
  right: .5rem;
  font-size: .9rem;
  color: #888;
}

button[type="button"] {
  font-size: 1.2rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-pageTitle {
    margin: 1.2rem 1.4rem;
    font-size: 1.7rem;
  }

  .p-formWrap {
    margin: auto;
  }

  .p-error__message {
    font-size: .9rem;
  }

  input[type="text"] {
    width: auto;
  }

  input[type="email"] {
    width: auto;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 640px) {
  .p-formWrap {
    margin: auto;
  }

  .p-error__message {
    font-size: .9rem;
  }

  input[type="text"] {
    width: auto;
  }

  input[type="email"] {
    width: auto;
  }
}
</style>

<template>
  <Dialog />
  <BackButton />
  <!-- TODO: ここにユーザプロフィール画像を載せられるようにする -->
  <p class="p-pageTitle c-text--center">ユーザ情報の更新</p>
  <section class="p-profile">
    <section class="p-profile__content">
      <section class="p-profile__image"></section>
      <form action="p-form">
        <section class="p-formWrap c-flex--wrap">
          <section class="p-form__group">
            <label for="username" class="required">ユーザ名</label>
            <section class="p-form__field">
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
              <section class="p-subText c-flex--spaceBetween">
                <section v-for="error of edit_v$.username.$errors" :key="error.$uid">
                  <section class="p-error__message">{{ error.$message }}</section>
                </section>
                <span class="p-count">{{ edit_state.username.length }} / 50</span>
              </section>
            </section>
          </section>
          <section class="p-form__group">
            <label for="email" class="required">メールアドレス</label>
            <section class="p-form__field">
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
            <section class="p-subText c-flex--spaceBetween">
              <section v-for="error of edit_v$.email.$errors" :key="error.$uid">
                <section class="p-error__message">{{ error.$message }}</section>
              </section>
              <span class="p-count">{{ edit_state.email.length }} / 150</span>
            </section>
          </section>
          <section class="p-form__group">
            <section class="p-form__field">
              <button type="button"
                @click="onSubmit"
                :disabled="!(
                  (edit_v$.username.$errors.length === 0 && edit_state.username !== '') &&
                  (edit_v$.email.$errors.length === 0 && edit_state.email !== '')
                )"
                class="c-btn c-btn--register">ユーザ情報を更新する</button>
            </section>
          </section>
          <DeleteUserButton />
        </section>
      </form>
    </section>
  </section>
</template>
