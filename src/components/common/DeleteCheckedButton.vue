<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const deleteCheckedItem = () => {};

const setFixedToButton = (event): void => {
  const deleteCheckBtn = document.getElementById('deleteCheckBtn') as HTMLElement;
  if (window.scrollY <= 50) {
    deleteCheckBtn.classList.remove('scroll');
  } else {
    deleteCheckBtn.classList.add('scroll');
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
.p-btn__deleteCheck {
  position: fixed;
  top: 18rem;
  right: 2rem;
  transition: .2s;
  z-index: 8998;
}
.p-btn__deleteCheck a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(255, 41, 41, 0.6);
  overflow: hidden;
}
.p-btn__deleteCheck a:hover {
  background-color: rgba(255, 102, 94, 0.6);
}
.p-btn__deleteCheck a:before {
  display: block;
  position: absolute;
  content: "";
  top: 50%;
  left: 70%;
  width: 5px;
  height: 33px;
  border-radius: .4rem;
  margin-left: -23%;
  margin-top: -28%;
  font-size: 2rem;
  transform: rotate(90deg);
  background-color: white;
}

/* sp */
@media screen and (max-width: 768px) {
  .p-btn__deleteCheck {
    right: .3rem;
    top: 20.6rem;
  }
  .p-btn__deleteCheck.scroll {
    top: 16.5rem;
  }
}
@media screen and (max-width: 768px) {
  .p-btn__deleteCheck.scroll {
    top: 16.5rem;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1409px) {
  .p-btn__deleteCheck {
    right: 1rem;
  }
}
</style>

<template>
  <section id="deleteCheckBtn" class="p-btn__deleteCheck">
    <a @click="deleteCheckedItem"></a>
  </section>
</template>
