<script setup lang="ts">
import MenuItem from "@/components/MenuItem.vue";
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
}
.menu-wrap {
  padding: .2rem;
  justify-content: space-between;
  background-color: black;
  color: white;
  z-index: 10000;
}

.flex-contents {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>

<template>
  <header class="header">
    <section class="menu-wrap flex-contents">
      <MenuItem />
    </section>
  </header>
</template>
