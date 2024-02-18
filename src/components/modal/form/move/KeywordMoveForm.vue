<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { keywordApi } from '@/plugin/apis';

const { user } = useAuth0();
const moveStore = inject('keywordMove');
const dialogStore = inject('dialog');
const store = inject('keyword');
const api = keywordApi();
const route = useRoute();

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const switchRadioChecked = (event: HTMLEvent<HTMLInputElement>): void => {
  moveStore.checked = ref(true);
};

const resetCategory = (event: HTMLEvent<HTMLButtonElement>): void => {
  const categoryRadio = document.querySelector<HTMLInputElement>('input[type="radio"].js-category__radio:checked');
  if (!categoryRadio) { return; }
  categoryRadio.checked = false;
  moveStore.checked = ref(false);
};
defineExpose({ resetCategory });

const emits = defineEmits<{(e: 'closeEvent', event: Object): void}>();
const onSubmit = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.preventDefault();

  interface ErrorResponse {
    message: String,
    name: String,
    code: String
  };

  const selected = document.querySelector('input.p-category__radio[type="radio"]:checked') as HTMLElement;
  if (!selected) { return; }
  const targetTitle = selected.dataset.title;

  axios.patch(api.moveUrl(user.value.sub, route.params.library_id, route.params.category_id, moveStore.id.value, selected.dataset.id))
    .then((response: AxiosResponse) => {
      store.remove(response.data.id);
      dialogStore.func.value('', `キーワード「${String(moveStore.title)}」を${targetTitle}に移動しました`);
      emits('closeEvent', event);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('読み込みエラー', 'カテゴリ読み込み中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
.p-formWrap {
  margin: 0 auto;
  max-width: 23rem;
}

.p-keyword__title {
  margin: .6rem 0;
  font-size: 2rem;
}

.p-form__group {
  margin: 3rem 0;
}

.p-category {
  padding: 1rem;
  border-radius: .3rem;
}

.p-category label {
  display: block;
  border-radius: .3rem;
  padding: .6rem;
  text-align: center;
}
.p-category input[type="radio"] + label {
  background-color: rgba(0,180,180,.2);
}
.p-category input[type="radio"]:checked + label {
  padding: .6rem;
  color: #fff;
  background-color: rgba(0,180,180,.9);
}

.p-category__label {
  margin: 0 .5rem;
}

.p-category__title {
  font-size: 1.12rem;
}

</style>

<template>
  <section class="p-formWrap">
    <section class="p-form__group">
      <section class="p-keyword__title c-text--center"><span>{{ moveStore.title }}</span></section>
      <section class="p-form__field">
        <section class="p-categoryList c-flex--start c-flex--wrap">
          <section v-for="category in moveStore.list" class="p-category c-flex--center">
            <input type='radio' :id="`category_${category.id}`" name="category" class='p-category__radio js-category__radio c-radio'
              :data-title="`${category.title}`" :data-id="`${category.id}`" @click="switchRadioChecked">
            <label :for="`category_${category.id}`" class="p-category__label">
              <span class="p-category__title">{{ category.title }}</span>
            </label>
          </section>
        </section>
      </section>
    </section>
    <section class="p-form__group">
      <section class="p-form__field c-text--center">
        <button type="button" @click="onSubmit"
          :disabled="!moveStore.checked"
          class="c-btn c-btn--register">{{ moveStore.title }}を移動する</button>
      </section>
    </section>
  </section>
</template>
