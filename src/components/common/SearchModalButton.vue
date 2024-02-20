<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const openModal = (event: HTMLEvent<HTMLButtonElement>): void => {
  const overlay = document.querySelector('#search-modal-overlay') as HTMLElement;
  overlay.classList.add('visible');
  document.getElementById('search-modal-form').classList.add('visible');
};

const setFixedToButton = (event): void => {
  const searchModalBtn = document.getElementById('searchModalBtn') as HTMLElement;
  if (window.scrollY <= 150) {
    searchModalBtn.classList.remove('scroll');
  } else {
    searchModalBtn.classList.add('scroll');
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
.p-btn__searchModal {
  position: fixed;
  top: 13rem;
  right: 2rem;
  transition: .2s;
  z-index: 8998;
}

.p-btn__searchModal a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(0, 38, 255, 0.6);
  overflow: hidden;
}

.p-btn__searchModal a:hover {
  background-color: rgba(67, 95, 255, 0.6);
}

.p-btn__searchModal img {
  transform: translate(44%, 44%);
}

/* sp */
@media screen and (max-width: 768px) {
  .p-btn__searchModal {
    right: .3rem;
    top: 15.6rem;
  }
  .p-btn__searchModal.scroll {
    top: 11.5rem;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1409px) {
  .p-btn__searchModal {
    right: 1rem;
  }
}
</style>

<template>
  <section id="searchModalBtn" class="p-btn__searchModal">
    <a @click="openModal">
      <img src="@/assets/images/search.png" width="30" alt="searchModalBtn" loading="lazy" class="p-searchImg">
    </a>
  </section>
</template>
