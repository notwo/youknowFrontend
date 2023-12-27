<script setup lang="ts">
const origin = window.history.state.back;
</script>

<style scoped>
.back-button {
  display: flex;
  width: auto;
  margin: 2rem 2rem;
}

.back-button a {
  text-decoration: none;
}

/* sp */
@media screen and (max-width: 414px) {
  .back-button {
    margin: 2rem 1rem;
  }
}
</style>

<template>
  <section class="back-button">
    <router-link :to="origin">
      <button type="button" class="btn back">戻る</button>
    </router-link>
  </section>
</template>
