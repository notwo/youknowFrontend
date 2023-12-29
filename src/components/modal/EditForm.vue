<script setup lang="ts">
defineProps({
  v: Object,
  state: Object,
  contentType: String,
  contentName: String,
  titleMaxLength: Number,
  contentMaxLength: Number
})

const emits = defineEmits<{(e: 'click', event: Object): void}>();
const onSubmit = (event): void => {
  emits('click', event)
}
</script>

<style scoped>
.p-formWrap {
  margin: 0 auto;
  max-width: 23rem;
}

.p-form__group {
  margin: 3rem 0;
}

label {
  display: block;
  margin: .75rem 0;
  font-size: 1.2rem;
  color: #666666;
  font-weight: 540;
}
label.required::after {
  position: relative;
  content: '必須';
  padding: .3rem;
  top: -.2rem;
  left: .6rem;
  font-size: .8rem;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  background-color: red;
}

#edit_library_title,#edit_category_title,#edit_keyword_title {
  padding: .6rem .8rem;
  width: 21rem;
  border-radius: .3rem;
  border: 2px solid #ddd;
}
:where(#edit_library_title,#edit_category_title,#edit_keyword_title):focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

#edit_library_content,#edit_category_content,#edit_keyword_content {
  padding: .6rem .8rem;
  border: 2px solid #ddd;
  border-radius: .3rem;
  resize: none;
  width: 21rem;
  height: 10rem;
}
:where(#edit_library_content,#edit_category_content,#edit_keyword_content):focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

input.error {
  border-color: rgba(220,0,0,0.3);
  background-color: rgba(220,0,0,0.3);
}
.p-error__message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

.p-subText {
  display: flex;
  justify-content: space-between;
}

.p-count {
  margin: 1rem .3rem 0 auto;
  right: .5rem;
  font-size: .9rem;
  color: #888;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-formWrap {
    max-width: 15.5rem;
    margin: 0 auto;
  }

  label {
    margin: .75rem 0;
  }
  .p-form__field {
    text-align: center;
  }
  #edit_library_title,#edit_category_title,#edit_keyword_title {
    width: auto;
  }
  #edit_library_content,#edit_category_content,#edit_keyword_content {
    width: 13rem;
  }
  .p-error__message {
    font-size: .9rem;
  }
  .p-subText {
  }
  .p-count {
    font-size: .7rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
}
</style>

<template>
  <section class="p-formWrap">
    <section class="p-form__group">
      <label :for="`edit_${contentType}_title`" class="required">{{ contentName }}名</label>
      <section class="p-form__field">
        <input type="text"
          :class="[v.title.$errors.length >= 1 ? 'error' : '']"
          v-model="state.title"
          :id="`edit_${contentType}_title`"
          :placeholder="`${contentName}名`"
          :maxlength="titleMaxLength"
          :error-messages="v.title.$errors.map((e) => e.$message)"
          @blur="v.title.$touch"
          @input="v.title.$touch">
        <section class="p-subText">
          <section v-for="error of v.title.$errors" :key="error.$uid">
            <p class="p-error__message">{{ error.$message }}</p>
          </section>
          <span class="p-count">{{ state.title.length }} / {{ titleMaxLength }}</span>
        </section>
      </section>
    </section>
    <section class="p-form__group">
      <label :for="`edit_${contentType}_content`" class="">内容</label>
      <section class="p-form__field">
        <textarea v-model="state.content"
          :id="`edit_${contentType}_content`"
          :placeholder="`${contentName}の内容`" :maxlength="contentMaxLength"></textarea>
        <section class="p-subText">
          <span class="p-count">{{ state.content.length }} / {{ contentMaxLength }}</span>
        </section>
      </section>
    </section>
    <section class="p-form__group">
      <section class="p-form__field">
        <button @click="onSubmit"
          :disabled="!(v.title.$errors.length === 0 && state.title !== '')"
          class="c-btn c-btn--register">{{ contentName }}を更新する</button>
      </section>
    </section>
  </section>
</template>
