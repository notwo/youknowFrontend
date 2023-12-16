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
  emits('click', event);
}
</script>

<style scoped>
.form-wrap {
  margin: 0 auto;
  max-width: 23rem;
}

.form-group {
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

#library_title,#category_title,#keyword_title {
  padding: .6rem .8rem;
  width: 21rem;
  border-radius: .3rem;
  border: 2px solid #ddd;
}
:where(#library_title,#category_title,#keyword_title):focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

#library_content,#category_content,#keyword_content {
  padding: .6rem .8rem;
  border: 2px solid #ddd;
  border-radius: .3rem;
  resize: none;
  width: 21rem;
  height: 10rem;
}
:where(#library_content,#category_content,#keyword_content):focus {
  border: 2px solid #fff0ff;
  outline: 0;
}

input.error {
  border-color: rgba(220,0,0,0.3);
  background-color: rgba(220,0,0,0.3);
}
.error-message {
  margin: .8rem 0;
  font-weight: 700;
  color: rgba(220,0,0,1);
}

.sub-text {
  display: flex;
  justify-content: space-between;
}

.count {
  margin: 1rem .3rem 0 auto;
  right: .5rem;
  font-size: .9rem;
  color: #888;
}
</style>

<template>
  <section class="form-wrap">
    <section class="form-group">
      <label :for="`${contentType}_title`" class="required">{{ contentName }}名</label>
      <section class="form-field">
        <input type="text"
          :class="[v.title.$errors.length >= 1 ? 'error' : '']"
          v-model="state.title"
          :id="`${contentType}_title`"
          :placeholder="`${contentName}名`"
          :maxlength="titleMaxLength"
          :error-messages="v.title.$errors.map((e) => e.$message)"
          @blur="v.title.$touch"
          @input="v.title.$touch">
        <section class="sub-text">
          <section v-for="error of v.title.$errors" :key="error.$uid">
            <section class="error-message">{{ error.$message }}</section>
          </section>
          <span class="count">{{ state.title.length }} / {{ titleMaxLength }}</span>
        </section>
      </section>
    </section>
    <section class="form-group">
      <label :for="`${contentType}_content`" class="">内容</label>
      <section class="form-field">
        <textarea v-model="state.content"
          :id="`${contentType}_content`"
          :placeholder="`${contentName}内容`" :maxlength="contentMaxLength"></textarea>
        <section class="sub-text">
          <span class="count">{{ state.content.length }} / {{ contentMaxLength }}</span>
        </section>
      </section>
    </section>
    <section class="form-group">
      <section class="form-field">
        <button type="button"
          @click="onSubmit"
          :disabled="!(v.title.$errors.length === 0 && state.title !== '')"
          class="btn register">{{ contentName }}を追加する</button>
      </section>
    </section>
  </section>
</template>
