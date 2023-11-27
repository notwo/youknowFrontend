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
import { useStore, editStore, titleStore, titles } from '@/store/index';
import NavigationHeader from "@/components/NavigationHeader.vue";
import FooterInformation from "@/components/FooterInformation.vue";

export default defineComponent({
  name: "App",
  components: { NavigationHeader, FooterInformation },
  setup() {
    const libraryStore = useStore();
    const libraryEditStore = editStore;
    const categoryStore = useStore();
    const categoryEditStore = editStore;
    const keywordStore = useStore();
    const keywordEditStore = editStore;
    const tagStore = useStore();
    const unattachedTagStore = useStore();
    const titlesStore = titles();
    provide('library', libraryStore);
    provide('category', categoryStore);
    provide('keyword', keywordStore);
    provide('tag', tagStore);
    provide('unattachedTag', unattachedTagStore);
    provide('libraryEdit', libraryEditStore);
    provide('categoryEdit', categoryEditStore);
    provide('keywordEdit', keywordEditStore);
    provide('titles', titlesStore);
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
  margin: 2rem 0;
  height: .2rem;
}
.main-bottom-pane  {
  margin: 2rem 0;
  height: .2rem;
}
</style>
