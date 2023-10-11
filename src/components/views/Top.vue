<template>
  <h3>TOP</h3>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  setup() {
    const { user, isAuthenticated, logout } = useAuth0();
    if (isAuthenticated.value) {
      interface UserRequest {
        sub: String,
        username: String,
        email: String
      };
      interface UserResponse {
        data: [],
      };

      const registerUser = async () => {
        const requestParam: UserRequest = {
          sub: user.value.sub,
          username: user.value.nickname,
          email: user.value.email,
          //email_verified: user.value.email_verified,
          //picture: user.value.picture,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/api/users2/`, requestParam)
          .then((response: AxiosResponse) => {
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          // 何かしらエラーが起きてアカウント登録できていないためログアウトさせる
          logout({ logoutParams: { returnTo: `${import.meta.env.VITE_BASE_URL}` } });
          // このタイミングで画面上にエラーが起きてログインできなかった旨をポップアップ表示する
        });
      };

      // ユーザ登録済みかどうかで処理を分ける(subで検索)
      const registerOrUpdate = async () => {
        const response = await axios.get<UserResponse>(`${import.meta.env.VITE_API_URL}/api/users2/?sub=${user.value.sub}`);
        if (response.data.length === 0) {
          registerUser();
        }
      };

      registerOrUpdate();
    }
  },
})
</script>

<style scoped>
</style>
