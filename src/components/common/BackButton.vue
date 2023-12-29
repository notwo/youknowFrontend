<script setup lang="ts">
const origin = window.history.state.back as String;
</script>

<style scoped>
.p-backButton {
  display: flex;
  width: auto;
  margin: 2rem 2rem;
}

.p-backButton a {
  text-decoration: none;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-backButton {
    margin: 2rem 1rem;
  }
}
</style>

<template>
  <section class="p-backButton">
    <router-link :to="origin">
      <button type="button" class="c-btn c-btn--back">戻る</button>
    </router-link>
  </section>
</template>
