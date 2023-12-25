<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { inject } from 'vue';

const auth0 = useAuth0();
const { logout } = useAuth0();

const libraryStore = inject('library');
const categoryStore = inject('category');
const keywordStore = inject('keyword');
const tagStore = inject('tag');

const login = (event): void => {
  auth0.loginWithRedirect();
}
const startLogout = (event): void => {
  libraryStore.allClear();
  categoryStore.allClear();
  keywordStore.allClear();
  tagStore.allClear();
  logout({ logoutParams: { returnTo: `${import.meta.env.VITE_BASE_URL}` } });
}

</script>

<style scoped>
.service-icon {
  margin: 2rem;
}

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

.logout {
  font-weight: 600;
  background-color: rgba(0,0,0,0.7);
}

@media screen and (max-width:768px) {
}
</style>

<template>
  <section class="service-icon">サービスロゴ</section>
  <nav class="menu">
    <ul v-if="!auth0.isAuthenticated.value" class="menu-item">
      <li>
        <span @click="login" class="btn register">ユーザ登録、ログイン</span>
      </li>
    </ul>
    <ul v-else class="menu-item">
      <li>
        <router-link :to="{ name: 'usertop', params: { username: String(auth0?.user?.value?.nickname) } }" class="btn">
          {{ auth0?.user?.value?.nickname }}
        </router-link>
      </li>
      <li>
        <span @click="startLogout" class="btn logout">ログアウト</span>
      </li>
    </ul>
  </nav>
</template>
