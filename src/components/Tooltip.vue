<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: String
});

let timeoutId: Number = 0;
const showTooltip = (e): void => {
  const currentContent = e.currentTarget as HTMLElement;
  const title = currentContent.getElementsByClassName('js-tooltip__title') as HTMLCollectionOf<HTMLElement>;
  const tooltip = currentContent.nextElementSibling as HTMLElement;
  const _showTooltip = (): void => {
    tooltip.style.left = `${title[0].getBoundingClientRect().left + window.scrollX}px`;
    tooltip.style.top = `${title[0].getBoundingClientRect().bottom + window.scrollY - 23}px`;
    tooltip.classList.add('p-tooltip__open');
  };
  timeoutId = setTimeout(_showTooltip, 300);
};
const hideTooltip = (e): void => {
  clearTimeout(timeoutId);
  const currentContent = e.currentTarget as HTMLElement;
  const tooltip = currentContent.nextElementSibling as HTMLElement;
  tooltip.classList.remove('p-tooltip__open');
};

onMounted(() => {
  const tooltipContents = document.querySelectorAll('.js-tooltip__content');
  tooltipContents.forEach((content) => {
    timeoutId = 0;
    content.addEventListener('mouseover', showTooltip);
    content.addEventListener('mouseout', hideTooltip);
  });
});

onUnmounted(() => {
  const tooltipContents = document.querySelectorAll('.js-tooltip__content');
  tooltipContents.forEach((content) => {
    content.removeEventListener('mouseover', showTooltip);
    content.removeEventListener('mouseover', hideTooltip);
  });
});
</script>

<style scoped>
.p-tooltip {
  position: absolute;
  display: none;
  padding: .3rem .7rem;
  line-height: 1.3;
  transform: translateY(80%);
  font-size: 0.8rem;
  border-radius: .3rem;
  background-color: rgb(74, 92, 255);
}

.p-tooltip__box {
  content: '';
  top: 0.2rem;
  left: 0.2rem;
  overflow-wrap: break-word;
}
.p-tooltip__box::before {
  content: '';
  position: absolute;
  top: -.8rem;
  left: .3rem;
  border: .5rem solid transparent;
  border-bottom: .5rem solid rgb(74, 92, 255);
}

.p-tooltip__open {
  display: block;
}
</style>

<template>
  <section class="p-tooltip c-fadeIn--fast c-color--white">
    <p class="p-message">{{ props.message }}</p>
    <p class="p-tooltip__box"></p>
  </section>
</template>
