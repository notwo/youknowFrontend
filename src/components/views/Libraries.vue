<script setup lang="ts">
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LibrarySearchForm from '@/components/library/LibrarySearchForm.vue';
import LibraryList from '@/components/library/LibraryList.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
</script>

<template>
  <DataRegisterModalButton />
  <Breadcrumb />
  <LibrarySearchForm />
  <LibraryList />
  <ScrollToTopButton />
</template>
