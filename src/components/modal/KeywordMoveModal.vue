<script setup lang="ts">
import { ref } from 'vue';
import KeywordMoveForm from '@/components/modal/form/move/KeywordMoveForm.vue';
import ScrollToTopButton from '@/components/common/ScrollToTopButton.vue';

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const moveFormComponent = ref(null);

const closeModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.preventDefault();
  document.body.style.removeProperty("overflow");

  const overlay = document.getElementById('overlay-move') as HTMLElement;
  overlay.classList.remove('visible');
  moveFormComponent.value.resetCategory();
};
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
  overflow : auto;
  max-height: 90%;
  overscroll-behavior-y: none;
}
.p-modal::-webkit-scrollbar {
  width: .5rem;
}
.p-modal::-webkit-scrollbar-track {
  border-radius: .5rem;
  background-color: #BBB;
}
.p-modal::-webkit-scrollbar-thumb {
  border-radius: .5rem;
  background-color: rgba(213, 213, 213, 0.9);
}

.p-close {
  display: block;
  width: 8rem;
  margin: 1.5rem 1.5rem 0 auto;
  cursor: pointer;
}
.p-close:hover {
  color: #888;
}

#move-form.visible {
  display: block;
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
  <section id="overlay-move" class="l-overlay">
    <section class="p-modal">
      <span id="close-move" class="p-close" @click="closeModal">モーダルを閉じる</span>
      <form action="" id="move-form" class="p-moveForm c-hidden">
        <KeywordMoveForm @closeEvent="closeModal" ref="moveFormComponent" />
      </form>
      <ScrollToTopButton :idPrefix="'moveModal_'" :backgroundColor="'rgba(170,200,200,.6)'" :right="'.1rem'" :parentElementString="'#overlay-move .p-modal'" />
    </section>
  </section>
</template>
