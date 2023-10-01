<template>
  <form action="">
    <span id="close" class="close" @click="closeModal"></span>
    <CategoryRegistrationForm :state="state" :v="v$" @closeEvent="closeModal" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { registerCategoryRules } from '@/plugin/validatorMessage';
import CategoryRegistrationForm from '@/components/modal/CategoryRegistrationForm.vue';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    CategoryRegistrationForm
  },
  setup() {
    let state = reactive({
      title: '',
      content: ''
    });

    const v$ = useVuelidate(registerCategoryRules(), state);

    const closeModal = (event: HTMLButtonEvent) => {
      event.preventDefault();
      const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
      modal[0].classList.remove('visible');
      // フォーム初期化
      state.title = '';
      state.content = '';
      v$.value.$reset();
    };

    return {
      v$,
      state,
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
</style>
