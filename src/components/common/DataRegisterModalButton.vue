<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  const overlay = document.querySelector('#overlay') as HTMLElement;
  overlay.classList.add('visible');
  document.getElementById('register-form').classList.add('visible');
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
  right: 2rem;
  transition: .2s;
  z-index: 8998;
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
.p-btn__register a:hover {
  background-color: rgba(0, 225, 225, 0.6);
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

/* sp */
@media screen and (max-width: 768px) {
  .p-btn__register {
    right: .3rem;
    top: 7.6rem;
  }
  .p-btn__register.scroll {
    top: 6.5rem;
  }

  .p-btn__register a {
    width: 2.5rem;
    height: 2.5rem;
  }

  .p-btn__register a:before {
    top: 34%;
    left: 46%;
  }
}
@media screen and (max-width: 768px) {
  .p-btn__register.scroll {
    top: 6.5rem;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1409px) {
  .p-btn__register {
    right: 1rem;
  }
}
</style>

<template>
  <section id="registerBtn" class="p-btn__register">
    <a @click="openModal"></a>
  </section>
</template>
