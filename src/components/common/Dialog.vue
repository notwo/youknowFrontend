<script setup lang="ts">
import { reactive, inject } from 'vue';

const dialogStore = inject('dialog');
const message = reactive({
  subject: String,
  body: String,
  mode: String,
});

const closeDialog = (): void => {
  const dialog = document.getElementById('dialog') as HTMLElement;
  dialog.classList.remove('open');
  dialog.classList.add('close');
  dialog.classList.add('c-fadeOut--fast');
};

const openDialog = (subject: String, body: String, mode: String = 'normal'): void => {
  message.subject = subject;
  message.body = body;
  message.mode = mode;

  const dialog = document.getElementById('dialog') as HTMLElement;
  dialog.style.top = `${window.screenY+90}px`;
  dialog.classList.remove('close');
  dialog.classList.remove('c-fadeOut--fast');
  dialog.classList.add('open');
  setTimeout(closeDialog, 1600);
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

.p-dialog {
  position: fixed;
  display: none;
  border-radius: .3rem;
  border: none;
  z-index: 9997;
  background-color: rgba(245,245,245,.9);
  box-shadow: 1px 1px 1px 1px black;
}
.p-dialog.open {
  display: block;
}
.p-dialog.close {
  display: none;
}

.p-dialogWrap {
}

.p-dialogContents {
  padding: .3rem .5rem;
  text-align: center;
}

.p-dialog__subject {
  margin: .6rem 0;
  font-weight: 600;
  font-size: 1rem;
}

.p-dialog__body {
  font-size: .8rem;
}

</style>

<template>
  <dialog class="p-dialog c-fadeIn--fast" id="dialog">
    <section class="p-dialogWrap">
      <section class="p-dialogContents" v-if="message.mode === 'normal'">
        <p class="p-dialog__subject" v-if="message.subject.length > 0">{{ message.subject }}</p>
        <p class="p-dialog__body">{{ message.body }}</p>
      </section>
      <section class="p-dialogContents c-color--red" v-if="message.mode === 'error'">
        <p class="p-dialog__subject c-color--red" v-if="message.subject.length > 0">{{ message.subject }}</p>
        <p class="p-dialog__body c-color--red">{{ message.body }}</p>
      </section>
    </section>
    <!--
    <section class="dialog-overlay">
      <section class="p-dialog">
        <section class="p-dialogContents">
          こ↑こ↓
        </section>
      </section>
    </section>
    -->
  </dialog>
</template>
