<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const login = (event) => {
  auth0.loginWithRedirect();
}
</script>

<style scoped>
.main-contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 2rem 5rem;
}

.main-contents a {
  color: #444;
  text-decoration: none;
}

.box {
  padding:  3rem 2rem;
  border: 1px #85ccff solid;
  border-radius: .6rem;
  width: 70%;
  cursor: pointer;
}
.box:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.box p {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
}
</style>

<template>
  <section class="main-contents">
    <router-link :to="{ name: 'libraries', params: { username: String(auth0?.user?.value?.nickname) } }" class="box" v-if="auth0.isAuthenticated.value">
      <p>データを登録してみる</p>
    </router-link>
    <section v-else @click="login" class="box">
      <p>データを登録してみる</p>
    </section>
  </section>
</template>
