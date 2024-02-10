<script setup lang="ts">
import CategoryForm from '@/components/modal/CategoryForm.vue';

defineProps({
  edit_state: Object
});
</script>

<style scoped>
.l-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .17s;
  opacity: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,0.4);
}
.l-overlay.visible {
  visibility: visible;
  opacity: 1;
}

.p-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: auto;
  border-radius: .4rem;
  background-color: white;
  overflow: auto;
  max-height: 90%;
  overscroll-behavior-y: none;
}
.p-modal::-webkit-scrollbar {
  width: .5rem;
}
.modal::-webkit-scrollbar-track {
  border-radius: .5rem;
  background-color: #CCC;
}
.p-modal::-webkit-scrollbar-thumb {
  border-radius: .5rem;
  background-color: rgba(213, 213, 213, 0.9);
}

/* sp */
@media screen and (max-width: 640px) {
  .p-modal {
    width: 95%;
    max-height: 95%;
  }
}
/* tablet */
@media screen and (min-width: 641px) and (max-width: 1024px) {
  .p-modal {
    width: 60%;
  }
}
</style>

<template>
  <section class="l-overlay js-overlay">
    <section class="p-modal">
      <CategoryForm :edit_state="edit_state" />
    </section>
  </section>
</template>
