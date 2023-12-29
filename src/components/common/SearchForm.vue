<script setup lang="ts">
defineProps({
  contentName: String,
});

const emits = defineEmits<{(e: 'click', event: Object): void}>();
const onSearch = (event): void => {
  emits('click', event)
};
</script>

<style scoped>
.p-searchWrap {
  padding: 1rem 0;
}

.p-search {
  padding: .6rem;
  width: 85%;
  border: none;
}

.p-searchButton {
  cursor: pointer;
  border: none;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-searchWrap {
    padding: 1rem 0;
  }

  .p-search {
    padding: .6rem;
    width: 65%;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
}
</style>

<template>
  <form action="" class="p-searchForm">
    <section class="p-searchWrap c-flex--center">
      <input type="text" name="search" id="search" class="p-search" :placeholder="`${contentName}を検索`">
      <button type="button" class="p-searchButton" @click="onSearch">
        <img src="@/assets/images/search.png" width="20" alt="search" loading="lazy" class="p-searchImg">
      </button>
    </section>
  </form>
</template>
