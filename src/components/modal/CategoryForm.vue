<template>
  <form action="">
    <span id="close" class="close" @click="closeModal"></span>
    <label for="category_title" class="required">カテゴリ名</label>
    <section class="form-field">
      <input type="text"
        :class="[v$.title.$errors.length >= 1 ? 'error' : '']"
        v-model="state.title"
        id="category_title"
        placeholder="カテゴリ名"
        :error-messages="v$.title.$errors.map((e) => e.$message)"
        @blur="v$.title.$touch"
        @input="v$.title.$touch">
      <section v-for="error of v$.title.$errors" :key="error.$uid">
        <section class="error-message">{{ error.$message }}</section>
      </section>
    </section>
    <label for="category_content" class="">内容</label>
    <section class="form-field">
      <textarea v-model="state.content" id="category_content" placeholder="カテゴリの内容"></textarea>
    </section>
    <CategoryRegistrationFormButton :state="state" :v="v$" @closeEvent="closeModal" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, inject } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { requiredMsg, duplicateMsg } from '@/plugin/validatorMessage';
import CategoryRegistrationFormButton from '@/components/modal/CategoryRegistrationFormButton.vue';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    CategoryRegistrationFormButton
  },
  setup() {
    let state = reactive({
      title: '',
      content: ''
    });

    const rules = {
      title: {
        required: helpers.withMessage(requiredMsg('カテゴリ名'), required),
        duplicated: helpers.withMessage(duplicateMsg('カテゴリ名'), function (val: String) {
          // API経由で結果を返却させるように後で修正
          const _titles = document.getElementsByClassName('title');
          if (_titles.length <= 0) { return true; }
          const _target = Array.from(_titles).find((element) => element.innerText === val);
          return !_target;
        })
      }
    };

    const v$ = useVuelidate(rules, state);

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

.modal label {
  font-size: 1.5em;
  font-weight: bold;
}
.modal label.required::after {
  position: relative;
  content: '必須';
  padding: 0.2em;
  top: -2px;
  left: 5px;
  font-size: 0.5em;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  background-color: red;
}

#category_content {
  resize: none;
  width: 40em;
  height: 10em;
}

input.error {
  border-color: rgba(220,0,0,0.3);
  background-color: rgba(220,0,0,0.3);
}


.error-message {
  color: rgba(220,0,0,0.3);
}
</style>
