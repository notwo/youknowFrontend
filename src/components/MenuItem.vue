<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import SpMenuItem from "@/components/SpMenuItem.vue";

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

const route = useRoute();
</script>

<style scoped>
.c-service__icon {
  margin: 2rem;
}
.c-service__icon a {
  color: white;
}

.p-menu {
  display: flex;
}

.p-menu__item {
}

.p-menu__item li {
  padding: .5rem 1rem;
  font-size: 1.0rem;
  font-weight: 700;
}

.p-waiting {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;
  line-height: 1.5;
  letter-spacing: 0.1em;
}

@media screen and (max-width: 768px) {
  .p-waiting {
    display: none;
  }

  .c-service__icon {
    margin: 2rem 1rem;
  }

  .p-menu {
    display: none;
  }
}
</style>

<template>
  <section class="c-service__icon">
    <router-link v-if="route.fullPath !== '/'" :to="{ name: 'top', params: {} }">サービスロゴ</router-link>
    <span v-else>サービスロゴ</span>
  </section>
  <nav class="p-menu">
    <ul v-if="auth0.isLoading.value" class="p-menu__item c-flex--spaceBetween">
      <li>
        <span class="p-waiting">
          Now Loading...
        </span>
      </li>
    </ul>
    <ul v-else-if="!auth0.isAuthenticated.value" class="p-menu__item c-flex--spaceBetween">
      <li>
        <span @click="login" class="c-btn c-btn--register">ユーザ登録/ログイン</span>
      </li>
    </ul>
    <ul v-else class="p-menu__item c-flex--spaceBetween">
      <li>
        <router-link :to="{ name: 'usertop', params: { username: String(auth0?.user?.value?.nickname) } }" class="c-btn">
          {{ auth0?.user?.value?.nickname }}
        </router-link>
      </li>
      <li>
        <span @click="startLogout" class="c-btn c-btn--logout">ログアウト</span>
      </li>
    </ul>
  </nav>
  <SpMenuItem />
</template>
