<template>
  <span id="close" class="close" @click="closeModal"></span>
  <form action="" id="register-form">
    <CategoryRegistrationForm :state="register_state" :v="register_v$" @closeEvent="closeModal" />
  </form>
  <form action="" id="edit-form">
    <CategoryEditForm :state="edit_state" :v="edit_v$" @closeEvent="closeModal" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { registerCategoryRules, editCategoryRules } from '@/plugin/validatorMessage';
import CategoryRegistrationForm from '@/components/modal/CategoryRegistrationForm.vue';
import CategoryEditForm from '@/components/modal/CategoryEditForm.vue';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    CategoryRegistrationForm,
    CategoryEditForm
  },
  setup() {
    let register_state = reactive({
      title: '',
      content: ''
    });
    let edit_state = reactive({
      title: '',
      content: ''
    });

    const register_v$ = useVuelidate(registerCategoryRules(), register_state);
    const edit_v$ = useVuelidate(editCategoryRules(), edit_state);

    const closeModal = (event: HTMLButtonEvent) => {
      event.preventDefault();
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.remove('visible');
      // フォーム初期化
      register_state.title = '';
      register_state.content = '';
      edit_state.title = '';
      edit_state.content = '';
      register_v$.value.$reset();
      edit_v$.value.$reset();
      document.getElementById('register-form').classList.remove('visible');
      document.getElementById('edit-form').classList.remove('visible');
    };

    return {
      register_v$,
      edit_v$,
      register_state,
      edit_state,
      closeModal,
    };
  }
});
</script>

<style scoped>

.modal .close {
  display: block;
  position: relative;
  width: 2em;
  height: 2em;
  margin-left: auto;
}
.modal .close::before, .modal .close::after {
  display: block;
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  top: 50%;
  left: 50%;
  background-color: black;
}
.modal .close::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.modal .close::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}
.modal #register-form {
  display: none;
}
.modal #edit-form {
  display: none;
}
.modal #register-form.visible {
  display: block;
}
.modal #edit-form.visible {
  display: block;
}

</style>
