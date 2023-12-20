<script setup lang="ts">
import { reactive, inject } from 'vue';

const dialogStore = inject('dialog');
const message = reactive({
  subject: String,
  body: String,
  mode: String,
});

const closeDialog = (): void => {
  const dialog = document.getElementById('dialog');
  dialog.classList.remove('open');
  dialog.classList.add('close');
};

const openDialog = (subject: String, body: String, mode: String = 'normal'): void => {
  message.subject = subject;
  message.body = body;
  message.mode = mode;

  const dialog = document.getElementById('dialog');
  dialog.style.top = `${window.screenY+20}px`;
  dialog.classList.remove('close');
  dialog.classList.add('open');
  setTimeout(closeDialog, 2000);
};

dialogStore.setFunc(openDialog);

</script>

<style scoped>
/*
.dialog-overlay {
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
.dialog-overlay.visible {
  visibility: visible;
  opacity: 1;
}
*/

.dialog {
  position: fixed;
  display: none;
  border-radius: .3rem;
  border: none;
  z-index: 9997;
  background-color: rgba(245,245,245,.9);
  box-shadow: 1px 1px 1px 1px black;
  animation: fadeIn .3s ease;
}
.dialog.open {
  display: block;
}
.dialog.close {
  display: none;
  animation: fadeOut .3s ease;
}

@keyframes fadeIn {
  0%{
    display: none;
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

@keyframes fadeOut {
  0%{
    display: block;
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

.dialog-wrap {
}

.dialog-contents {
  padding: .3rem .5rem;
  text-align: center;
}

.subject {
  margin: .6rem 0;
  font-weight: 600;
  font-size: 1rem;
}

.body {
  font-size: .8rem;
}

.error {
  color: red;
}
</style>

<template>
  <dialog class="dialog" id="dialog">
    <section class="dialog-wrap">
      <section class="dialog-contents" v-if="message.mode === 'normal'">
        <section class="subject" v-if="message.subject.length > 0">{{ message.subject }}</section>
        <section class="body">{{ message.body }}</section>
      </section>
      <section class="dialog-contents error" v-if="message.mode === 'error'">
        <section class="subject error" v-if="message.subject.length > 0">{{ message.subject }}</section>
        <section class="body error">{{ message.body }}</section>
      </section>
    </section>
    <!--
    <section class="dialog-overlay">
      <section class="dialog">
        <section class="dialog-contents">
          こ↑こ↓
        </section>
      </section>
    </section>
    -->
  </dialog>
</template>
