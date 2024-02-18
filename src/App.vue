<script setup lang="ts">
import { provide } from "vue";
import { useStore, editStore, moveStore } from '@/store/index';
import { userStore } from '@/store/user';
import { titles } from '@/store/titles';
import { dialogStore } from '@/store/dialog';
import { loadingStore } from '@/store/loading';
import NavigationHeader from "@/components/NavigationHeader.vue";
import FooterInformation from "@/components/FooterInformation.vue";

const _libraryStore = useStore();
const _libraryEditStore = editStore;
const _categoryStore = useStore();
const _categoryEditStore = editStore;
const _keywordStore = useStore();
const _keywordEditStore = editStore;
const _keywordMoveStore = moveStore;
const _tagStore = useStore();
const _unattachedTagStore = useStore();
const _titlesStore = titles();
const _userStore = userStore();
const _dialogStore = dialogStore();
const _loadingStore = loadingStore();

provide('library', _libraryStore);
provide('category', _categoryStore);
provide('keyword', _keywordStore);
provide('tag', _tagStore);
provide('unattachedTag', _unattachedTagStore);
provide('libraryEdit', _libraryEditStore);
provide('categoryEdit', _categoryEditStore);
provide('keywordEdit', _keywordEditStore);
provide('keywordMove', _keywordMoveStore);
provide('titles', _titlesStore);
provide('user', _userStore);
provide('dialog', _dialogStore);
provide('loading', _loadingStore);
</script>

<style scoped>
.l-main {
  flex: 1;
}

.l-container {
  margin: 0 auto;
  max-width: 1100px;
  background: rgb(250, 250, 252); /** 一通りデザインを当ててコンテンツを配置し終わったら消す */
  overflow: hidden;
}

.l-main__top  {
  margin: 1rem 0;
  height: .2rem;
}
.l-main__bottom  {
  margin: 1rem 0;
  height: .2rem;
}
</style>

<template>
  <NavigationHeader />

  <section class="l-main">
    <main class="l-container">
      <section class="l-main__top"></section>
      <router-view></router-view>
      <section class="l-main__bottom"></section>
    </main>
  </section>

  <FooterInformation />
</template>
