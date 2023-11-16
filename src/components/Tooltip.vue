<script setup lang="ts">
const props = defineProps({
  title: String
});

const tooltipContents = document.querySelectorAll('.tooltip-content');
tooltipContents.forEach((content) => {
  let timeoutId: Number = 0;
  content.addEventListener('mouseover', (e) => {
    const currentContent = e.currentTarget;
    const title = content.getElementsByClassName('title');
    const tooltip = currentContent.nextElementSibling;
    const showTooltip = () => {
      tooltip.style.left = `${title[0].getBoundingClientRect().left + window.scrollX}px`;
      tooltip.style.top = `${title[0].getBoundingClientRect().top + window.scrollY + 24}px`;
      tooltip.classList.add('tooltip-open');
    };
    timeoutId = setTimeout(showTooltip, 700);
  });
  content.addEventListener('mouseout', (e) => {
    clearTimeout(timeoutId);
    const currentContent = e.currentTarget;
    const tooltip = currentContent.nextElementSibling;
    tooltip.classList.remove('tooltip-open');
  });
});
</script>

<style scoped>
.tooltip-box {
  content: '';
  top: 0.2em;
  left: 0.2em;
}
.tooltip {
  position: absolute;
  display: none;
}
.tooltip-open {
  display: block;
}
</style>

<template>
  <section class="tooltip">
    <section class="message">{{ props.title }}</section>
    <section class="tooltip-box"></section>
  </section>
</template>
