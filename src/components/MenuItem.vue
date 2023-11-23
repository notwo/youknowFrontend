<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { inject } from 'vue';

const auth0 = useAuth0();
const { logout } = useAuth0();

const libraryStore = inject('library');
const categoryStore = inject('category');
const keywordStore = inject('keyword');
const tagStore = inject('tag');

const login = (event) => {
  auth0.loginWithRedirect();
}
const startLogout = (event) => {
  libraryStore.allClear();
  categoryStore.allClear();
  keywordStore.allClear();
  tagStore.allClear();
  logout({ logoutParams: { returnTo: `${import.meta.env.VITE_BASE_URL}` } });
}

</script>

<style scoped>
.menu {
  display: flex;
}
.menu li {
  padding: 0.5em 1em;
  font-size: 1.0rem;
  font-weight: 700;
}
.menu-item {
  display: flex;
  justify-content: center;
}

.register {
  background-color: rgba(0,255,0,0.7);
}

.logout {
  font-weight: 600;
  background-color: rgba(0,0,0,0.7);
}
</style>

<template>
  <section class="menu">
    <ul v-if="!auth0.isAuthenticated.value" class="menu-item">
      <li>
        <span @click="login" class="btn register">ユーザ登録、ログイン</span>
      </li>
    </ul>
    <ul v-else class="menu-item">
      <li v-if="auth0.isAuthenticated.value">
        <router-link :to="{ name: 'libraries', params: { username: String(auth0.user.value.nickname) } }" class="btn">
          ライブラリ
        </router-link>
      </li>
      <li v-if="auth0.isAuthenticated.value">
        <span @click="startLogout" class="btn logout">ログアウト</span>
      </li>
    </ul>
  </section>
</template>
