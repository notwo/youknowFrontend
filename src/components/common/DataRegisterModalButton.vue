<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
  modal[0].classList.add('visible');
  document.getElementById('register-form').classList.add('visible');
  document.getElementById('edit-form').classList.remove('visible');
};

const setFixedToButton = (event): void => {
  const registerBtn = document.getElementById('registerBtn');
  if (window.scrollY <= 50) {
    registerBtn.classList.remove('scroll');
  } else {
    registerBtn.classList.add('scroll');
  }
};

onMounted(() => {
  window.addEventListener("scroll", setFixedToButton, false);
});

onUnmounted(() => {
  window.removeEventListener('scroll', setFixedToButton, false);
});
</script>

<style scoped>
.btn-register {
  position: fixed;
  top: 8rem;
  right: 6rem;
  z-index: 9998;
}
.btn-register a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(0,180,180,.6);
  overflow: hidden;
}
.btn-register a:before {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -23%;
  margin-top: -28%;
  color: #FFF;
  font-size: 2rem;
  content: "+";
}

.floating {
  transition: .2s;
}

/* sp */
@media screen and (max-width: 1024px) {
  .btn-register {
    right: .3rem;
  }
  .btn-register.scroll {
    top: .3rem;
  }

  .btn-register.scroll {
    top: 6.5rem;
  }
}

/* tablet */
@media screen and (min-width: 1025px) and (max-width: 1409px) {
  .btn-register {
    right: 1rem;
  }
  .btn-register.scroll {
    top: 1rem;
  }
}
</style>

<template>
  <section id="registerBtn" class="btn-register floating">
    <a @click="openModal"></a>
  </section>
</template>
