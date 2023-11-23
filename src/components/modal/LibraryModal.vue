<script setup lang="ts">
import LibraryForm from '@/components/modal/LibraryForm.vue';

const props = defineProps({
  edit_state: Object
});
</script>

<style scoped>
.overlay {
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
.overlay.visible {
  visibility: visible;
  opacity: 1;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: auto;
  border-radius: .4rem;
  background-color: white;
  overflow : auto;
  max-height: 90%;
}
</style>

<template>
  <section class="overlay">
    <section class="modal">
      <LibraryForm :edit_state="edit_state" />
    </section>
  </section>
</template>
