<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { inject } from 'vue';

const auth0 = useAuth0();
const { logout } = useAuth0();

const libraryStore = inject('library');
const categoryStore = inject('category');
const keywordStore = inject('keyword');
const tagStore = inject('tag');

const openSpMenu = (): void => {
  const overlay = document.querySelector(".sp-nav-overlay") as HTMLElement;
  const spNavBtn = document.querySelector(".sp-nav-button") as HTMLElement;
  overlay.classList.add('visible');
  spNavBtn.classList.add('sp-nav-open');
};
const closeSpMenu = (): void => {
  const overlay = document.querySelector(".sp-nav-overlay") as HTMLElement;
  overlay.classList.remove('visible');
  const spNavBtn = document.querySelector(".sp-nav-button") as HTMLElement;
  spNavBtn.classList.remove('sp-nav-open');
};

const login = (event): void => {
  auth0.loginWithRedirect();
}
const startLogout = (event): void => {
  libraryStore.allClear();
  categoryStore.allClear();
  keywordStore.allClear();
  tagStore.allClear();
  closeSpMenu();
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

.menu-item {
  display: flex;
  justify-content: center;
}

.menu-item li {
  padding: 0.5em 1em;
  font-size: 1.0rem;
  font-weight: 700;
}

.logout {
  font-weight: 600;
}

.sp-login {
  display: none;
  margin: 2rem 1rem;
}

.sp-nav-button {
  display: none;
  position: absolute;
  margin: 0 auto;
  transition: all .4s;
  top: 34px;
  bottom: 0;
  right: 34px;
  width: 20px;
  height: 30px;
  border: none;
  outline: none;
  background: none;
  font-weight: bold;
  line-height: 1;
  z-index: 10000;
}

.sp-nav-button .sp-nav-item {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #464646;
}

.sp-nav-button .sp-nav-item:nth-of-type(1) {
  top: -5px;
}
.sp-nav-button .sp-nav-item:nth-of-type(2) {
  top: 2.5px;
}
.sp-nav-button .sp-nav-item:nth-of-type(3) {
  top: 10px;
}

.sp-nav-button .sp-nav-menu,
.sp-nav-button .sp-nav-close {
  display: block;
  position: absolute;
  bottom: 0;
  left: -40%;
  width: 34px;
  height: 11px;
  font-size: .7rem;
  color: white;
}

.sp-nav-button .sp-nav-close {
  display: none;
}

.sp-nav-button.sp-nav-open .sp-nav-item {
  height: 4px;
}
.sp-nav-button.sp-nav-open .sp-nav-item:nth-of-type(1) {
  top: 4px;
  transform: rotate(45deg);
}
.sp-nav-button.sp-nav-open .sp-nav-item:nth-of-type(2) {
  top: 4px;
  transform: rotate(-45deg);
}
.sp-nav-button.sp-nav-open .sp-nav-item:nth-of-type(3) {
  display: none;
}
.sp-nav-button.sp-nav-open .sp-nav-menu {
  display: none;
}
.sp-nav-button.sp-nav-open .sp-nav-close {
  display: block;
}

.sp-nav-overlay {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0,0,0,0.8);
}
.sp-nav-overlay.visible {
  display: block;
}

.sp-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 20%;
  width: 100%;
  height: 100vh;
}

.sp-menu-item li {
  margin: 1rem 0;
  font-size: 1.3rem;
}

@media screen and (max-width: 768px) {
  .service-icon {
  margin: 2rem 1rem;
}

  .menu {
    display: none;
  }

  .sp-login {
    display: block;
  }

  .sp-nav-button {
    display: block;
  }
}
</style>

<template>
  <section class="service-icon">サービスロゴ</section>
  <nav class="menu">
    <ul v-if="!auth0.isAuthenticated.value" class="menu-item">
      <li>
        <span @click="login" class="btn register">ユーザ登録/ログイン</span>
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
  <!-- SP navigation -->
  <section v-if="!auth0.isAuthenticated.value" class="sp-login">
    <span @click="login" class="">ユーザ登録/ログイン</span>
  </section>
  <button v-else class="sp-nav-button">
    <span class="sp-nav-item"></span>
    <span class="sp-nav-item"></span>
    <span class="sp-nav-item"></span>
    <span class="sp-nav-menu" @click="openSpMenu">MENU</span>
    <span class="sp-nav-close" @click="closeSpMenu">CLOSE</span>
  </button>
  <!-- SP navigation menu item -->
  <section v-if="auth0.isAuthenticated.value" class="sp-nav-overlay">
    <nav class="sp-menu">
      <ul class="sp-menu-item">
        <li>
          <router-link :to="{ name: 'usertop', params: { username: String(auth0?.user?.value?.nickname) } }" class="btn" @click="closeSpMenu">
            {{ auth0?.user?.value?.nickname }}
          </router-link>
        </li>
        <li>
          <span @click="startLogout" class="btn logout">ログアウト</span>
        </li>
      </ul>
    </nav>
  </section>
</template>
