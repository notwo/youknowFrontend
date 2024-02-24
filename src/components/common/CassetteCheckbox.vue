<script setup lang="ts">
const props = defineProps({
  contentType: String,
  id: Number
});
</script>

<style scoped>
.p-cassette__checkboxArea {
  margin: 0 .6rem;
  height: 2rem;
  width: 2rem;
  border: 1px solid #076edc;
  border-radius: .3rem;
  z-index: 1;
}
.p-cassette__checkboxArea:hover, .p-cassette__checkboxArea:has(input[type="checkbox"]:checked) {
  border: 1px rgb(74, 92, 255) solid;
}

.p-cassette__checkbox {
  position: relative;
  box-sizing: border-box;
  padding: 0% 100% 0% 100%;
  cursor: pointer;
}
.p-cassette__checkbox::before, .p-cassette__checkbox::after {
  display: block;
  content: '';
}
input[type="checkbox"]:checked + .p-cassette__checkbox::before  {
  transform: rotate(-45deg);
  margin: -.2rem 0rem;
  height: .8rem;
  width: .4rem;
  border-right: 3px solid #f4064e;
}
input[type="checkbox"]:checked + .p-cassette__checkbox::after  {
  transform: rotate(45deg);
  margin: -1.65rem .8rem;
  height: 1.6rem;
  width: .4rem;
  border-right: 3px solid #f4064e;
}
</style>

<template>
  <section class="p-cassette__checkboxArea">
    <input :id="`${contentType}_${id}`" type="checkbox" class="c-checkbox js-deleteCheckItem" :data-id="id">
    <label :for="`${contentType}_${id}`" class="p-cassette__checkbox"></label>
  </section>
</template>
