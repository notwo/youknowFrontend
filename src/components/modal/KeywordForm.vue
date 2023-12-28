<template>
  <span id="close" class="p-close" @click="closeModal">モーダルを閉じる</span>
  <form action="" id="register-form" class="p-registerForm">
    <KeywordRegistrationForm :state="register_state" :v="register_v$" @closeEvent="closeModal" />
  </form>
  <form action="" id="edit-form" class="p-editForm">
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
    const register_state = reactive({
      title: '',
      content: ''
    });

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const store = inject('keywordEdit');

    const register_v$ = useVuelidate(registerRules('キーワード名'), register_state);
    const edit_v$ = useVuelidate(editRules('キーワード名', store), props.edit_state);

    const closeModal = (event: HTMLEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      document.body.style.removeProperty("overflow");
      const modal = document.getElementsByClassName('l-overlay') as HTMLCollectionOf<HTMLElement>;
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
.p-close {
  display: block;
  width: 8rem;
  margin: 1.5rem 1.5rem 0 auto;
  cursor: pointer;
}
.p-close:hover {
  color: #888;
}

#register-form {
  display: none;
}
#edit-form {
  display: none;
}
#register-form.visible {
  display: block;
}
#edit-form.visible {
  display: block;
}
</style>
