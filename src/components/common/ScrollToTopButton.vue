<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

let scrollId: number = 0;
const f = (): void => {
  const button = document.getElementById('scrollToTopButton');
  button.classList.remove('hidden-no-animation');
  if (window.scrollY === 0) {
    button.classList.add('hidden');
    clearInterval(scrollId);
  } else {
    button.classList.remove('hidden');
  }
};

const scrollToTop = (event): void => {
  const scroll = () => {
    window.scrollTo(0, window.scrollY - window.scrollY / 10);
  };

  scrollId = setInterval(scroll, 10);

  return false;
};

onMounted(() => {
  window.addEventListener("scroll", f, false);
});
onUnmounted(() => {
  window.removeEventListener("scroll", f, false);
});
</script>

<style scoped>
.scroll-to-top-button {
  position: fixed;
  bottom: 1.6rem;
  right: 2rem;
  z-index: 9999;
}
.scroll-to-top-button a {
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
.scroll-to-top-button a.hidden-no-animation {
  display: none;
}
.scroll-to-top-button a.hidden {
  animation: fadeOut .3s ease 0s;
  animation-fill-mode: forwards;
}
.scroll-to-top-button a:before {
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

/* sp, tablet */
@media screen and (max-width: 768px) {
  .scroll-to-top-button {
    bottom: .3rem;
    right: .3rem;
  }
}
</style>

<template>
  <section class="scroll-to-top-button">
    <a id="scrollToTopButton" @click="scrollToTop" class="hidden hidden-no-animation"></a>
  </section>
</template>
