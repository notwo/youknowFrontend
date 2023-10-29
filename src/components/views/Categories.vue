<template>
  <DataRegisterModalButton />
  <Breadcrumb />
  <CategorySearchForm />
  <CategoryList />
</template>

<script setup lang="ts">
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import CategorySearchForm from '@/components/category/CategorySearchForm.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import CategoryList from '@/components/category/CategoryList.vue';
</script>
