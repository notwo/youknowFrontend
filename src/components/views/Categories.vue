<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import Loading from '@/components/common/Loading.vue';
import DataRegisterModalButton from '@/components/common/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import CategorySearchForm from '@/components/category/CategorySearchForm.vue';
import CategoryList from '@/components/category/CategoryList.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <Loading />
  <DataRegisterModalButton />
  <Breadcrumb />
  <CategorySearchForm />
  <CategoryList />
  <ScrollToTopButton />
</template>
