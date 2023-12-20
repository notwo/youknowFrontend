<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LibrarySearchForm from '@/components/library/LibrarySearchForm.vue';
import LibraryList from '@/components/library/LibraryList.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <DataRegisterModalButton />
  <Breadcrumb />
  <LibrarySearchForm />
  <LibraryList />
  <ScrollToTopButton />
</template>
