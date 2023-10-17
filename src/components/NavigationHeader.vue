<template>
  <header>
    <nav class="menu-wrap">
      <section class="flex-contents">
        <section class="service-icon">サービスアイコン</section>
        <MenuItem />
      </section>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue';
import MenuItem from "@/components/MenuItem.vue";

export default defineComponent({
  name: 'Login',
  components: {
    MenuItem,
  },
  setup() {}
});
</script>

<style scoped>
header.fixed {
  position: fixed;
}

nav {
  width: 100%;
  z-index: 10000;
  justify-content: space-between;
  background-color: black;
  color: white;
}

.menu-wrap {
  padding: 0.2em;
}
</style>
