<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import CategorySearchForm from '@/components/category/CategorySearchForm.vue';
import CategoryList from '@/components/category/CategoryList.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <DataRegisterModalButton />
  <Breadcrumb />
  <CategorySearchForm />
  <CategoryList />
  <ScrollToTopButton />
</template>
