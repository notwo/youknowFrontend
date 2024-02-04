<script setup lang="ts">
import MenuItem from "@/components/MenuItem.vue";
</script>

<style scoped>
.l-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
}
.p-menuWrap {
  padding: .2rem;
  background-color: black;
  z-index: 10000;
}
</style>

<template>
  <header class="l-header">
    <section class="p-menuWrap c-flex--spaceBetween c-flex-wrap c-color--white">
      <MenuItem />
    </section>
  </header>
</template>
