<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

let scrollId: number = 0;
const showButton = (): void => {
  const button = document.getElementById('scrollToTopButton') as HTMLElement;
  button.classList.remove('c-hiddenNoAnimation');
  if (window.scrollY === 0) {
    button.classList.add('c-hidden');
    clearInterval(scrollId);
  } else {
    button.classList.remove('c-hidden');
  }
};

const scrollToTop = (event): Boolean => {
  const scroll = () => {
    window.scrollTo(0, window.scrollY - window.scrollY / 10);
  };

  scrollId = setInterval(scroll, 10);

  return false;
};

onMounted(() => {
  window.addEventListener("scroll", showButton, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", showButton, false);
});
</script>

<style scoped>
.p-scrollToTopButton {
  position: fixed;
  bottom: 1.6rem;
  right: 2rem;
  z-index: 9000;
}
.p-scrollToTopButton a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
  background-color: rgba(180,180,180,.6);
  overflow: hidden;
  animation: fadeIn .3s ease;
}
.p-scrollToTopButton a.c-hidden {
  animation: fadeOut .3s ease 0s;
  animation-fill-mode: forwards;
}
.p-scrollToTopButton a:before {
  display: inline-block;
  content: "";
  position: absolute;
  width: 0.65rem;
  height: 0.65rem;
  top: 37%;
  left: 33%;
  border-right: 5px solid #000;
  border-top: 5px solid #000;
  font-size: 2rem;
  transform: rotate(-45deg);
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
  0%{ opacity: 1; }
  100%{
    display: none;
    opacity: 0;
  }
}

/* sp */
@media screen and (max-width: 1024px) {
  .p-scrollToTopButton {
    bottom: .3rem;
    right: .3rem;
  }
}

/* tablet */
@media screen and (min-width: 1025px) and (max-width: 1409px) {
  .p-scrollToTopButton {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>

<template>
  <section class="p-scrollToTopButton">
    <a id="scrollToTopButton" @click="scrollToTop" class="c-hidden"></a>
  </section>
</template>
