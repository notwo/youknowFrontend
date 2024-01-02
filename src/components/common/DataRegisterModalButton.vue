<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  const modal = document.getElementsByClassName('l-overlay') as HTMLCollectionOf<HTMLElement>;
  modal[0].classList.add('visible');
  document.getElementById('register-form').classList.add('visible');
  document.getElementById('edit-form').classList.remove('visible');
};

const setFixedToButton = (event): void => {
  const registerBtn = document.getElementById('registerBtn') as HTMLElement;
  if (window.scrollY <= 50) {
    registerBtn.classList.remove('scroll');
  } else {
    registerBtn.classList.add('scroll');
  }
};

onMounted(() => {
  window.addEventListener("scroll", setFixedToButton, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', setFixedToButton, false);
});
</script>

<style scoped>
.p-btn__register {
  position: fixed;
  top: 8rem;
  right: 6rem;
  z-index: 9998;
}
.p-btn__register a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(0,180,180,.6);
  overflow: hidden;
}
.p-btn__register a:before {
  display: block;
  position: absolute;
  top: 44%;
  left: 53%;
  margin-left: -23%;
  margin-top: -28%;
  color: #FFF;
  font-size: 2rem;
  content: "+";
}

.c-floating {
  transition: .2s;
}

/* sp */
@media screen and (max-width: 1024px) {
  .p-btn__register {
    right: .3rem;
    top: 13.6rem;
  }
  .p-btn__register.scroll {
    top: 6.5rem;
  }
}

/* tablet */
@media screen and (min-width: 1025px) and (max-width: 1409px) {
  .p-btn__register {
    right: 1rem;
  }
  .p-btn__register.scroll {
    top: 1rem;
  }
}
</style>

<template>
  <section id="registerBtn" class="p-btn__register c-floating">
    <a @click="openModal"></a>
  </section>
</template>
