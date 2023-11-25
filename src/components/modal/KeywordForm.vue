<template>
  <span id="close" class="close" @click="closeModal"></span>
  <form action="" id="register-form">
    <KeywordRegistrationForm :state="register_state" :v="register_v$" @closeEvent="closeModal" />
  </form>
  <form action="" id="edit-form">
    <KeywordEditForm :state="edit_state" :v="edit_v$" @closeEvent="closeModal" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { registerRules, editRules } from '@/plugin/validatorMessage';
import KeywordRegistrationForm from '@/components/modal/KeywordRegistrationForm.vue';
import KeywordEditForm from '@/components/modal/KeywordEditForm.vue';

export default defineComponent({
  name: 'KeywordForm',
  components: {
    KeywordRegistrationForm,
    KeywordEditForm
  },
  props: {
    edit_state: Object
  },
  setup(props) {
    let register_state = reactive({
      title: '',
      content: ''
    });

    const store = inject('keywordEdit');

    const register_v$ = useVuelidate(registerRules('キーワード名'), register_state);
    const edit_v$ = useVuelidate(editRules('キーワード名', store), props.edit_state);

    const closeModal = (event: HTMLButtonEvent) => {
      event.preventDefault();
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.remove('visible');
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

    return {
      register_v$,
      edit_v$,
      register_state,
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
