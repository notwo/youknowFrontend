<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: String
});

let timeoutId: Number = 0;
const showTooltip = (e) => {
  const currentContent = e.currentTarget;
  const title = currentContent.getElementsByClassName('title');
  const tooltip = currentContent.nextElementSibling;
  const _showTooltip = () => {
    tooltip.style.left = `${title[0].getBoundingClientRect().left + window.scrollX}px`;
    tooltip.style.top = `${title[0].getBoundingClientRect().bottom + window.scrollY - 23}px`;
    tooltip.classList.add('tooltip-open');
  };
  timeoutId = setTimeout(_showTooltip, 300);
};
const hideTooltip = (e) => {
  clearTimeout(timeoutId);
  const currentContent = e.currentTarget;
  const tooltip = currentContent.nextElementSibling;
  tooltip.classList.remove('tooltip-open');
};

onMounted(() => {
  const tooltipContents = document.querySelectorAll('.tooltip-content');
  tooltipContents.forEach((content) => {
    timeoutId = 0;
    content.addEventListener('mouseover', showTooltip);
    content.addEventListener('mouseout', hideTooltip);
  });
});

onUnmounted(() => {
  const tooltipContents = document.querySelectorAll('.tooltip-content');
  tooltipContents.forEach((content) => {
    content.removeEventListener('mouseover', showTooltip);
    content.removeEventListener('mouseover', hideTooltip);
  });
});
</script>

<style scoped>
.tooltip {
  position: absolute;
  display: none;
  padding: .3rem;
  line-height: 1.3;
  transform: translateY(80%);
  font-size: 0.8rem;
  border-radius: .3rem;
  color: white;
  background-color: rgb(74, 92, 255);
  animation: fadeIn .1s ease;
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

.tooltip-box {
  content: '';
  top: 0.2rem;
  left: 0.2rem;
  overflow-wrap: break-word;
}
.tooltip-box::before {
  content: '';
  position: absolute;
  top: -.8rem;
  border: .5rem solid transparent;
  border-bottom: .5rem solid rgb(74, 92, 255);
}

.tooltip-open {
  display: block;
}
</style>

<template>
  <section class="tooltip">
    <section class="message">{{ props.message }}</section>
    <section class="tooltip-box"></section>
  </section>
</template>
