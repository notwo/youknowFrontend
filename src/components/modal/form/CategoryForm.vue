<script setup lang="ts">
import { reactive, inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { registerRules, editRules } from '@/plugin/validatorMessage';
import CategoryRegistrationForm from '@/components/modal/form/register/CategoryRegistrationForm.vue';
import CategoryEditForm from '@/components/modal/form/edit/CategoryEditForm.vue';

const props = defineProps({
  edit_state: Object
});
const register_state = reactive({
  title: '',
  content: ''
});

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const store = inject('categoryEdit');

const register_v$ = useVuelidate(registerRules('カテゴリ名'), register_state);
const edit_v$ = useVuelidate(editRules('カテゴリ名', store), props.edit_state);

const closeModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.preventDefault();
  document.body.style.removeProperty("overflow");
  const overlay = document.querySelector('.js-overlay') as HTMLElement;
  overlay.classList.remove('visible');
  // フォーム初期化
  register_state.title = '';
  register_state.content = '';
  props.edit_state.title = '';
  props.edit_state.content = '';
  register_v$.value.$reset();
  edit_v$.value.$reset();
  document.getElementById('register-form').classList.remove('visible');
  document.getElementById('edit-form').classList.remove('visible');
};
</script>

<style scoped>
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
#edit-form.visible {
  display: block;
}
</style>

<template>
  <span id="close" class="p-close" @click="closeModal">モーダルを閉じる</span>
  <form action="" id="register-form" class="p-registerForm c-hidden">
    <CategoryRegistrationForm :state="register_state" :v="register_v$" @closeEvent="closeModal" />
  </form>
  <form action="" id="edit-form" class="p-editForm c-hidden">
    <CategoryEditForm :state="edit_state" :v="edit_v$" @closeEvent="closeModal" />
  </form>
</template>
