<script setup lang="ts">
import { inject } from 'vue';

const loadingStore = inject('loading');

const showLoading = () => {
  const loading = document.getElementById('loading') as HTMLElement;
  if (loading !== null) {
    loadingStore.setElement(loading);
  }
  loadingStore.element.value.classList.add('js-open');
  console.log(loadingStore.element.value)
  const base = document.querySelector('.js-loadingBase');
  console.log(base)
  base?.appendChild(loadingStore.element.value);
};

const hideLoading = () => {
  loadingStore.element.value.classList.remove('js-open');
  //const base = document.querySelector('.js-loadingBase');
  //base?.removeChild(loading);
};

loadingStore.setShowFunc(showLoading);
loadingStore.setHideFunc(hideLoading);
</script>

<style scoped>
.p-loading {
  display: none;
}
.p-loading.js-open {
  display: block;
}

.p-loadingContent {
  margin: 3rem auto;
  border: 4rem solid #fafafa;
  border-radius: 50%;
  border-top: 4rem solid #3498db;
  width: 10rem;
  height: 10rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }
}

/* sp */
@media screen and (max-width: 768px) {
  .p-loadingContent {
    margin: 1rem auto;
    border: 3rem solid #fafafa;
    border-top: 3rem solid #3498db;
    width: 8rem;
    height: 8rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-loadingContent {
    margin: 2rem auto;
    border: 3.5rem solid #fafafa;
    border-top: 3.5rem solid #3498db;
    width: 9rem;
    height: 9rem;
  }
}
</style>

<template>
  <section class="p-loading c-fadeIn--normal" id="loading">
    <section class="p-loadingWrap">
      <section class="p-loadingContent"></section>
    </section>
  </section>
</template>
