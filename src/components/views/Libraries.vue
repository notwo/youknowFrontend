<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import Loading from '@/components/common/Loading.vue';
import DataRegisterModalButton from '@/components/common/DataRegisterModalButton.vue';
import SearchModalButton from '@/components/common/SearchModalButton.vue';
import SearchModal from '@/components/modal/SearchModal.vue';
import DeleteCheckedButton from '@/components/common/DeleteCheckedButton.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import LibraryList from '@/components/library/LibraryList.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <Loading />
  <DataRegisterModalButton />
  <SearchModalButton />
  <SearchModal :contentType="'library'" :contentName="'ライブラリ'" />
  <DeleteCheckedButton :contentType="'library'" :contentName="'ライブラリ'" />
  <Breadcrumb />
  <LibraryList />
  <ScrollToTopButton />
</template>
