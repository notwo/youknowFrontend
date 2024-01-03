<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import Loading from '@/components/common/Loading.vue';
import DataRegisterModalButton from '@/components/common/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LibrarySearchForm from '@/components/library/LibrarySearchForm.vue';
import LibraryList from '@/components/library/LibraryList.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <Loading />
  <DataRegisterModalButton />
  <Breadcrumb />
  <LibrarySearchForm />
  <LibraryList />
  <ScrollToTopButton />
</template>
