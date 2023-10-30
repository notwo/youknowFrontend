<script setup lang="ts">
import { defineComponent } from 'vue';
import DataRegisterModalButton from '@/components/DataRegisterModalButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LibrarySearchForm from '@/components/library/LibrarySearchForm.vue';
import LibraryList from '@/components/library/LibraryList.vue';
</script>

<template>
  <DataRegisterModalButton />
  <Breadcrumb />
  <LibrarySearchForm />
  <LibraryList />
</template>
