<template>
  <DataRegisterModalButton />
  <LibrarySearchForm />
  <LibraryList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import LibrarySearchForm from '@/components/library/LibrarySearchForm.vue';
import LibraryList from '@/components/library/LibraryList.vue';

export default defineComponent({
  name: 'Libraries',
  components: {
    DataRegisterModalButton,
    LibrarySearchForm,
    LibraryList
  },
});
</script>
