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
  const overlay = document.querySelector(".p-sp__navOverlay") as HTMLElement;
  const spNavBtn = document.querySelector(".p-sp__navButton") as HTMLElement;
  overlay.classList.add('visible');
  spNavBtn.classList.add('sp-nav-open');
};
const closeSpMenu = (): void => {
  const overlay = document.querySelector(".p-sp__navOverlay") as HTMLElement;
  overlay.classList.remove('visible');
  const spNavBtn = document.querySelector(".p-sp__navButton") as HTMLElement;
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
.c-service__icon {
  margin: 2rem;
}

.p-menu {
  display: flex;
}

.p-menu__item {
  display: flex;
  justify-content: center;
}

.p-menu__item li {
  padding: 0.5em 1em;
  font-size: 1.0rem;
  font-weight: 700;
}

/* SP */
.p-sp__login {
  display: none;
  margin: 2rem 1rem;
}

.p-sp__navButton {
  display: none;
  position: absolute;
  margin: 0 auto;
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

.p-sp__navButton .p-sp__navItem {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  transition: all .15s;
  background-color: #464646;
}

.p-sp__navButton .p-sp__navItem:nth-of-type(1) {
  top: -5px;
}
.p-sp__navButton .p-sp__navItem:nth-of-type(2) {
  top: 2.5px;
}
.p-sp__navButton .p-sp__navItem:nth-of-type(3) {
  top: 10px;
}

.p-sp__navButton .p-sp__navMenu,
.p-sp__navButton .p-sp__navClose {
  display: block;
  position: absolute;
  bottom: 0;
  left: -40%;
  width: 34px;
  height: 11px;
  font-size: .7rem;
}

.p-sp__navButton .p-sp__navClose {
  display: none;
}

.p-sp__navButton.sp-nav-open .p-sp__navItem {
  height: 4px;
  transition: all .15s;
}
.p-sp__navButton.sp-nav-open .p-sp__navItem:nth-of-type(1) {
  top: 4px;
  transform: rotate(45deg);
}
.p-sp__navButton.sp-nav-open .p-sp__navItem:nth-of-type(2) {
  top: 4px;
  transform: rotate(-45deg);
}
.p-sp__navButton.sp-nav-open .p-sp__navItem:nth-of-type(3) {
  display: none;
}
.p-sp__navButton.sp-nav-open .p-sp__navMenu {
  display: none;
}
.p-sp__navButton.sp-nav-open .p-sp__navClose {
  display: block;
}

.p-sp__navOverlay {
  position: fixed;
  opacity: 0;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  transition: all .15s;
  z-index: 9999;
  background-color: rgba(0,0,0,0.8);
}
.p-sp__navOverlay.visible {
  width: 100%;
  opacity: 1;
}

.p-sp__menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 20%;
  width: 100%;
  height: 100vh;
}

.p-sp__menuItem li {
  margin: 1rem 0;
  font-size: 1.3rem;
}

@media screen and (max-width: 768px) {
  .c-service__icon {
  margin: 2rem 1rem;
}

  .p-menu {
    display: none;
  }

  .p-sp__login {
    display: block;
  }

  .p-sp__navButton {
    display: block;
  }
}
</style>

<template>
  <section class="c-service__icon">サービスロゴ</section>
  <nav class="p-menu">
    <ul v-if="!auth0.isAuthenticated.value" class="p-menu__item">
      <li>
        <span @click="login" class="btn register">ユーザ登録/ログイン</span>
      </li>
    </ul>
    <ul v-else class="p-menu__item">
      <li>
        <router-link :to="{ name: 'usertop', params: { username: String(auth0?.user?.value?.nickname) } }" class="btn">
          {{ auth0?.user?.value?.nickname }}
        </router-link>
      </li>
      <li>
        <span @click="startLogout" class="btn p-logout">ログアウト</span>
      </li>
    </ul>
  </nav>
  <!-- SP navigation -->
  <section v-if="!auth0.isAuthenticated.value" class="p-sp__login">
    <span @click="login" class="p-login">ユーザ登録/ログイン</span>
  </section>
  <button v-else class="p-sp__navButton">
    <span class="p-sp__navItem"></span>
    <span class="p-sp__navItem"></span>
    <span class="p-sp__navItem"></span>
    <span class="p-sp__navMenu c-color--white" @click="openSpMenu">MENU</span>
    <span class="p-sp__navClose c-color--white" @click="closeSpMenu">CLOSE</span>
  </button>
  <!-- SP navigation menu item -->
  <section v-if="auth0.isAuthenticated.value" class="p-sp__navOverlay">
    <nav class="p-sp__menu">
      <ul class="p-sp__menuItem">
        <li>
          <router-link :to="{ name: 'usertop', params: { username: String(auth0?.user?.value?.nickname) } }" class="btn" @click="closeSpMenu">
            {{ auth0?.user?.value?.nickname }}
          </router-link>
        </li>
        <li>
          <span @click="startLogout" class="btn p-logout">ログアウト</span>
        </li>
      </ul>
    </nav>
  </section>
</template>
