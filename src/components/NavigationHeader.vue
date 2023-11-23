<template>
  <header class="header">
    <nav class="menu-wrap">
      <section class="flex-contents">
        <section class="service-icon">サービスロゴ</section>
        <MenuItem />
      </section>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import MenuItem from "@/components/MenuItem.vue";

export default defineComponent({
  name: 'NavigationHeader',
  components: {
    MenuItem,
  },
  setup() {
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
  }
});
</script>

<style scoped>
nav.fixed {
  position: fixed;
}

nav {
  z-index: 10000;
  justify-content: space-between;
  background-color: black;
  color: white;
}

.menu-wrap {
  padding: 0.2em;
}

.service-icon {
  margin: 2rem;
}
</style>
