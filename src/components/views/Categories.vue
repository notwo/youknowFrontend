<template>
  <DataRegisterModalButton />
  <CategoryModal />
  <CategorySearchForm />
  <CategoryList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import CategoryModal from '@/components/modal/CategoryModal.vue';
import CategorySearchForm from '@/components/CategorySearchForm.vue';
import CategoryList from '@/components/CategoryList.vue';

export default defineComponent({
  name: 'Categories',
  components: {
    DataRegisterModalButton,
    CategoryModal,
    CategorySearchForm,
    CategoryList
  },
  setup () {
  }
});
</script>
