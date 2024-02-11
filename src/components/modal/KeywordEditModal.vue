<script setup lang="ts">
import { inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { editRules } from '@/plugin/validatorMessage';
import KeywordEditForm from '@/components/modal/form/edit/KeywordEditForm.vue';

const props = defineProps({
  edit_state: Object
});

const store = inject('keywordEdit');
const v$ = useVuelidate(editRules('キーワード名', store), props.edit_state);

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const closeModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.preventDefault();
  document.body.style.removeProperty("overflow");
  document.getElementById('edit-form').classList.remove('visible');

  const overlay = document.querySelector('#overlay-edit') as HTMLElement;
  overlay.classList.remove('visible');
  // フォーム初期化
  props.edit_state.title = '';
  props.edit_state.content = '';
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

.p-closeEdit {
  display: block;
  width: 8rem;
  margin: 1.5rem 1.5rem 0 auto;
  cursor: pointer;
}
.p-closeEdit:hover {
  color: #888;
}

#edit-form.visible {
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
  <section id="overlay-edit" class="l-overlay">
    <section class="p-modal">
      <span id="close-edit" class="p-closeEdit" @click="closeModal">モーダルを閉じる</span>
      <form action="" id="edit-form" class="p-editForm c-hidden">
        <KeywordEditForm :state="edit_state" :v="v$" @closeEvent="closeModal" />
      </form>
    </section>
  </section>
</template>
