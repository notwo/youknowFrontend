<template>
  <h3>TOP</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { userCreateUrl, userDetailUrl } from '@/plugin/apis';

export default defineComponent({
  name: 'Top',
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

      interface ErrorResponse {
        message: String,
        name: String,
        code: String
      };

      const registerUser = async () => {
        const requestParam: UserRequest = {
          sub: user.value.sub,
          username: user.value.nickname,
          email: user.value.email,
          //email_verified: user.value.email_verified,
          //picture: user.value.picture,
        };
        axios.post(userCreateUrl(), requestParam)
          .then((response: AxiosResponse) => {
          })
          .catch((e: AxiosError<ErrorResponse>) => {
            // 何かしらエラーが起きてアカウント登録できていないため、アラート表記の上ログアウトさせる
            logout();
            alert('アカウント登録時に異常が発生しました。お手数ですが、しばらく経ってから再度お試しください。');
          });
      };

      const registerOrUpdate = async () => {
        const response = await axios.get<UserResponse>(userDetailUrl(user.value.sub));
        if (response.data.length === 0) {
          registerUser();
        }
      };

      registerOrUpdate();
    }
  },
});
</script>

<style scoped>
</style>
