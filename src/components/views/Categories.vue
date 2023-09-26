<template>
  <DataRegisterModalButton />
  <CategoryRegistrationForm />
  <CategorySearchForm />
  <CategoryList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import CategoryRegistrationForm from '@/components/CategoryRegistrationForm.vue';
import CategorySearchForm from '@/components/CategorySearchForm.vue';
import CategoryList from '@/components/CategoryList.vue';

export default defineComponent({
  name: 'Categories',
  components: {
    DataRegisterModalButton,
    CategoryRegistrationForm,
    CategorySearchForm,
    CategoryList
  },
  setup () {
  }
});
</script>
