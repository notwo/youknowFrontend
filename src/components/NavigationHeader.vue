<script setup lang="ts">
import MenuItem from "@/components/MenuItem.vue";

/*
const nav = document.getElementsByTagName('nav');
const navigationTracking = () => {
  const height = nav[0].clientHeight;
  const navOffsetTop = window.scrollY;
  if (navOffsetTop >= height / 2) {
    nav[0].classList.add('fixed');
  } else {
    nav[0].classList.remove('fixed');
  }
};
onMounted(() => {
  window.addEventListener("scroll", navigationTracking, false);
});

onUnmounted(() => {
  window.removeEventListener('scroll', navigationTracking, false);
});
*/
</script>

<style scoped>
nav {
}

.menu-wrap {
  padding: 0.2em;
  justify-content: space-between;
  background-color: black;
  color: white;
  z-index: 10000;
}

.service-icon {
  margin: 2rem;
}
</style>

<template>
  <header class="header">
    <section class="menu-wrap">
      <section class="flex-contents">
        <MenuItem />
      </section>
    </section>
  </header>
</template>
