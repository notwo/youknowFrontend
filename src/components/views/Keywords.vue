<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import Loading from '@/components/common/Loading.vue';
import DataRegisterModalButton from '@/components/common/DataRegisterModalButton.vue';
import KeywordSearchForm from '@/components/keyword/KeywordSearchForm.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import KeywordList from '@/components/keyword/KeywordList.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';
</script>

<template>
  <Dialog />
  <Loading />
  <DataRegisterModalButton />
  <Breadcrumb />
  <KeywordSearchForm />
  <KeywordList />
  <ScrollToTopButton />
</template>
