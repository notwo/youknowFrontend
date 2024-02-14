<script setup lang="ts">
import { inject } from 'vue';

const moveStore = inject('keywordMove');
</script>

<style scoped>
.p-formWrap {
  margin: 0 auto;
  max-width: 23rem;
}

.p-form__group {
  margin: 3rem 0;
}
</style>

<template>
  <section class="p-formWrap">
    <section class="p-form__group">
      <section class="p-form__field">
        <section class="p-categoryList c-flex--start c-flex--wrap">
          <section v-for="category in moveStore.list" class="p-category">
            <section class="p-category__title">{{ category.title }}</section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
