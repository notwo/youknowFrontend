<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { registerRules } from '@/plugin/validatorMessage';
import LibraryRegistrationForm from '@/components/modal/form/register/LibraryRegistrationForm.vue';

const state = reactive({
  title: '',
  content: ''
});

const v$ = useVuelidate(registerRules('ライブラリ名'), state);

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const closeModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.preventDefault();
  document.body.style.removeProperty("overflow");

  const overlay = document.querySelector('#overlay') as HTMLElement;
  overlay.classList.remove('visible');
  // フォーム初期化
  state.title = '';
  state.content = '';
  v$.value.$reset();
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
.modal::-webkit-scrollbar-track {
  border-radius: .5rem;
  background-color: #CCC;
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

#register-form.visible {
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
  <section id="overlay" class="l-overlay">
    <section class="p-modal">
      <span id="close" class="p-close" @click="closeModal">モーダルを閉じる</span>
      <form action="" id="register-form" class="p-registerForm c-hidden">
        <LibraryRegistrationForm :state="state" :v="v$" @closeEvent="closeModal" />
      </form>
    </section>
  </section>
</template>
