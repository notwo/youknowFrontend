<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const { logout } = useAuth0();

const login = () => {
  auth0.loginWithRedirect();
}
const startLogout = () => {
  logout({ logoutParams: { returnTo: `${import.meta.env.VITE_BASE_URL}` } });
}

</script>

<style scoped></style>

<template>
  <section class="menu">
    <ul class="menu-item">
      <li v-if="!auth0.isAuthenticated.value"><button @click="login">ログイン</button></li>
      <li v-if="auth0.isAuthenticated.value"><a class="sp-char-mini" href="/">Profile</a></li>
      <li v-if="auth0.isAuthenticated.value">
        <router-link :to="{ name: 'libraries', params: { username: String(auth0.user.value.nickname) } }">
          登録済み<br>ライブラリ
        </router-link>
      </li>
      <li v-if="auth0.isAuthenticated.value"><button @click="startLogout">ログアウト</button></li>
    </ul>
  </section>
</template>

<style scoped>
.menu {
  display: flex;
}
.menu li {
  padding: 0.5em 2em;
  font-size: 1.0rem;
  font-weight: 700;
}
.menu-item {
  display: flex;
  justify-content: center;
}
</style>
