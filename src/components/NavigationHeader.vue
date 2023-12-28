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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: .2rem;
  justify-content: space-between;
  background-color: black;
  color: white;
  z-index: 10000;
}
</style>

<template>
  <header class="l-header">
    <section class="p-menuWrap">
      <MenuItem />
    </section>
  </header>
</template>
