<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import Loading from '@/components/common/Loading.vue';
import DataRegisterModalButton from '@/components/common/DataRegisterModalButton.vue';
import SearchModalButton from '@/components/common/SearchModalButton.vue';
import SearchModal from '@/components/modal/SearchModal.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import KeywordList from '@/components/keyword/KeywordList.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <Loading />
  <DataRegisterModalButton />
  <SearchModalButton />
  <SearchModal :contentType="'keyword'" :contentName="'キーワード'" />
  <Breadcrumb />
  <KeywordList />
  <ScrollToTopButton />
</template>
