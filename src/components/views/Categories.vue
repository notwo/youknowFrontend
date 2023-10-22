<template>
  <DataRegisterModalButton />
  <CategorySearchForm />
  <CategoryList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import CategorySearchForm from '@/components/category/CategorySearchForm.vue';
import CategoryList from '@/components/category/CategoryList.vue';

export default defineComponent({
  name: 'Categories',
  components: {
    DataRegisterModalButton,
    CategorySearchForm,
    CategoryList
  },
});
</script>
