<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  idPrefix: String,
  width: String,
  height: String,
  right: String,
  backgroundColor: String,
  parentElementString: String,
});

const prefix = props.idPrefix ? props.idPrefix : "" as String;

const setStyle = (): void => {
  const link = document.getElementById(`${prefix}scrollToTopButton`) as HTMLElement;
  const button = link.parentElement as HTMLElement;

  if (props.width) {
    button.style.width = props.width;
  }
  if (props.height) {
    button.style.height = props.height;
  }
  if (props.right) {
    button.style.right = props.right;
  }
  if (props.backgroundColor) {
    link.style.backgroundColor = props.backgroundColor;
  }
};

let scrollId: number = 0;
const showButton = (): void => {
  const button = document.getElementById(`${prefix}scrollToTopButton`) as HTMLElement;

  if (window.scrollY === 0) {
    button.classList.add('js-fadeOut');
    clearInterval(scrollId);
  } else {
    button.classList.remove('js-fadeOut');
  }
};

let scrollIdExtra: number = 0;
const showButtonExtra = (): void => {
  const button = document.getElementById(`${prefix}scrollToTopButton`) as HTMLElement;
  const parentElement = props.parentElementString ? document.querySelector(props.parentElementString) : null;
  const self = button.parentElement as HTMLElement;
  self.style.bottom = `-${parentElement?.scrollTop}px`;

  if (parentElement.scrollTop === 0) {
    button.classList.add('js-fadeOut');
    clearInterval(scrollIdExtra);
  } else {
    button.classList.remove('js-fadeOut');
  }
};

const scrollToTop = (event): Boolean => {
  const parentElement = props.parentElementString ? document.querySelector(props.parentElementString) : null;

  if (parentElement) {
    const scroll = (): void => {
      parentElement.scrollTo(0, parentElement.scrollTop - parentElement.scrollTop / 10);
    };
    scrollIdExtra = setInterval(scroll, 10);
  } else {
    const scroll = (): void => {
      window.scrollTo(0, window.scrollY - window.scrollY / 10);
    };
    scrollId = setInterval(scroll, 10);
  }

  return false;
};

onMounted(() => {
  setStyle();

  const parentElement = props.parentElementString ? document.querySelector(props.parentElementString) : null;
  if (parentElement) {
    parentElement.addEventListener("scroll", showButtonExtra, { passive: true });
  } else {
    window.addEventListener("scroll", showButton, { passive: true });
  }
});
onUnmounted(() => {
  const parentElement = props.parentElementString ? document.querySelector(props.parentElementString) : null;
  if (parentElement) {
    parentElement.removeEventListener("scroll", showButtonExtra, false);
  } else {
    window.removeEventListener("scroll", showButton, false);
  }
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
}
.p-scrollToTopButton a.js-fadeOut {
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
    <a :id="`${prefix}scrollToTopButton`" @click="scrollToTop" class="js-fadeOut c-fadeIn--fast"></a>
  </section>
</template>
