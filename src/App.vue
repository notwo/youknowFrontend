<template>
  <section class="full-layout">
    <section class="main">
      <NavigationHeader />

      <main class="container">
        <section class="main-top-pane"></section>
        <router-view></router-view>
        <section class="main-bottom-pane"></section>
      </main>
    </section>

  </section>
  <FooterInformation />
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { useStore, editStore, titles, userStore } from '@/store/index';
import NavigationHeader from "@/components/NavigationHeader.vue";
import FooterInformation from "@/components/FooterInformation.vue";

export default defineComponent({
  name: "App",
  components: { NavigationHeader, FooterInformation },
  setup() {
    const _libraryStore = useStore();
    const _libraryEditStore = editStore;
    const _categoryStore = useStore();
    const _categoryEditStore = editStore;
    const _keywordStore = useStore();
    const _keywordEditStore = editStore;
    const _tagStore = useStore();
    const _unattachedTagStore = useStore();
    const _titlesStore = titles();
    const _userStore = userStore();
    provide('library', _libraryStore);
    provide('category', _categoryStore);
    provide('keyword', _keywordStore);
    provide('tag', _tagStore);
    provide('unattachedTag', _unattachedTagStore);
    provide('libraryEdit', _libraryEditStore);
    provide('categoryEdit', _categoryEditStore);
    provide('keywordEdit', _keywordEditStore);
    provide('titles', _titlesStore);
    provide('user', _userStore);
  }
});

</script>

<style scoped>
.full-layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.main {
  flex: 1;
}

.container {
  margin: 0 auto;
  max-width: 1100px;
  background: rgb(250, 250, 252); /** 一通りデザインを当ててコンテンツを配置し終わったら消す */
}

.main-top-pane  {
  margin: 1rem 0;
  height: .2rem;
}
.main-bottom-pane  {
  margin: 1rem 0;
  height: .2rem;
}
</style>
