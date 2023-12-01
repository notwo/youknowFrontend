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
.search-form {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.search {
  padding: .6rem;
  width: 85%;
  border: none;
}

.search-button {
  cursor: pointer;
  border: none;
}
</style>

<template>
  <form action="">
    <section class="search-form">
      <input type="text" name="search" id="search" class="search" :placeholder="`${contentName}を検索`">
      <button type="button" class="search-button" @click="onSearch">
        <img src="@/assets/images/search.png" width="20" alt="search">
      </button>
    </section>
  </form>
</template>
