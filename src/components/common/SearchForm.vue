<script setup lang="ts">
defineProps({
  contentName: String,
});

const emits = defineEmits<{(e: 'click', event: Object, searchType: String, title: String): void}>();
const onSearch = (event): void => {
  const searchType = document.getElementById('search-type').value as String;
  const title = document.getElementById('search').value as String;
  emits('click', event, searchType, title);
};
</script>

<style scoped>
.p-searchWrap {
  padding: 1rem 0;
}

.p-searchType {
  display: block;
  margin-right: -.2rem;
  border: none;
  border-radius: .3rem 0 0 .3rem;
  z-index: 9001;
}

.p-search {
  padding: .6rem;
  width: 75%;
  border: none;
  border-radius: 0 0 0 0;
  z-index: 9001;
}

.p-searchButton {
  cursor: pointer;
  border-radius: 0 .3rem .3rem 0;
  border: none;
  z-index: 9001;
}

.p-overlay__search {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: .17s;
  opacity: 0;
  z-index: 9000;
  background-color: rgba(0,0,0,0.4);
}
.p-overlay__search.visible {
  visibility: visible;
  opacity: 1;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-searchWrap {
    padding: 1rem 0;
  }

  .p-searchType {
    padding: .6rem;
    width: 50%;
    border-radius: .3rem;
  }

  .p-search {
    padding: .6rem;
    width: 65%;
    border-radius: .3rem 0 0 .3rem;
  }
}
/* tablet */
@media screen and (min-width: 415px) and (max-width: 768px) {
  .p-searchType {
    padding: .6rem;
    width: 50%;
  }

  .p-search {
    width: 50%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1440px) {
  .p-search {
    width: 50%;
  }
}
</style>

<template>
  <form action="" class="p-searchForm">
    <section class="p-searchWrap c-flex--center c-flex--wrap">
      <select id="search-type" class="p-searchType c-text--center">
        <option value="0">タイトルで検索</option>
        <option value="1">タグで検索</option>
        <option value="2">本文で検索</option>
      </select>
      <input type="text" name="search" id="search" class="p-search" :placeholder="`${contentName}を検索`">
      <button type="button" class="p-searchButton" @click="onSearch">
        <img src="@/assets/images/search.png" width="20" alt="search" loading="lazy" class="p-searchImg">
      </button>
    </section>
  </form>
</template>
