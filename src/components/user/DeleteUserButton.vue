<script setup lang="ts">
import { inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { userApi } from '@/plugin/apis';

const auth0 = useAuth0();

interface ErrorResponse {
  username: String
  email: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const store = inject('user');
const dialogStore = inject('dialog');

const api = userApi();
const deleteToAuth0 = async (): Promise<void> => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": 'Bearer ' + import.meta.env.VITE_AUTH0_API_ACCESS_TOKEN
  };

  await axios.delete(api.auth0UserUrl(auth0?.user?.value?.sub), { headers: headers })
    .then((response: AxiosResponse) => {
      window.location.href = '/';
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      console.log(e.response);
    });
};
const onDelete = (event: HTMLEvent<HTMLButtonElement>): void => {
  if (!window.confirm(`あなたのユーザアカウントが削除されますが宜しいですか？ 後から戻すことは出来ません`)) {
    return;
  }

  axios.delete(api.detailUrl(store.uuid.value))
    .then((response: AxiosResponse) => {
      deleteToAuth0();
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'ユーザアカウント削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

</script>

<style scoped>
.p-form__group {
  margin: 1.3rem 0;
}
.p-form__group.p-attention {
  margin: 2.3rem 0;
}

button[type="button"] {
  font-size: 1.2rem;
}
</style>

<template>
  <section class="p-form__group p-attention">
    <section class="p-form__field">
      <button type="button"
        @click="onDelete"
        class="c-btn c-btn--delete">アカウント削除する</button>
    </section>
  </section>
</template>
