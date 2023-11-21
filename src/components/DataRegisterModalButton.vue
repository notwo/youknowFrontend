<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const openModal = (event) => {
  const modal = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
  modal[0].classList.add('visible');
  document.getElementById('register-form').classList.add('visible');
  document.getElementById('edit-form').classList.remove('visible');
};

const setFixedToButton = (event) => {
  const registerBtn = document.getElementById('registerBtn');
  if (window.scrollY <= 50) {
    registerBtn.style.top = '8rem';
  } else {
    registerBtn.style.top = '3rem';
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
  z-index: 9999;
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
</style>

<template>
  <section id="registerBtn" class="btn-register floating">
    <a @click="openModal"></a>
  </section>
</template>
