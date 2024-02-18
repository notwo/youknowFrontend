<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const login = (event): void => {
  auth0.loginWithRedirect();
}
</script>

<style scoped>
.p-mainContents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 5rem;
}

.p-mainContents a {
  color: #444;
  text-decoration: none;
}

.p-mainContents__box {
  padding:  3rem 2rem;
  border: 1px #85ccff solid;
  border-radius: .6rem;
  width: 70%;
  cursor: pointer;
}
.p-mainContents__box:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-mainContents__box p {
  font-size: 2rem;
  font-weight: 800;
}

.p-mainContents__loading {
  font-size: 5rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-mainContents {
    margin: 0 1rem;
  }

  .p-mainContents__box {
    width: 80%;
  }

  .p-mainContents__box p {
    font-size: 1.2rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-mainContents__box {
    width: 80%;
  }
}
</style>

<template>
  <section class="p-mainContents">
    <router-link v-if="auth0.isAuthenticated.value"
      :to="{ name: 'libraries', params: { username: String(auth0?.user?.value?.nickname) } }" class="p-mainContents__box c-text--center">
      <p class="p-mainContents__message">データを登録してみる</p>
    </router-link>
    <section v-else class="p-mainContents__loadingBox c-text--center">
      <p class="p-mainContents__loading">Loading...</p>
    </section>
  </section>
</template>
