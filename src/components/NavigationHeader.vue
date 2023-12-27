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
