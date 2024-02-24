<script setup lang="ts">
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';
import CassetteMenu from '@/components/library/CassetteMenu.vue';
import CassetteCheckbox from '@/components/common/CassetteCheckbox.vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
  updated_at: String
});
</script>

<style scoped>
.p-library__item {
  position: relative;
  width: 30%;
  height: 20rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-library__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-library__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-library__menuArea {
  margin: .6rem;
  z-index: 1;
}

.p-library__body {
  margin: 1rem .5rem;
}

.p-library__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-library__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-library__updated_at {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-library__item {
    width: 80%;
    height: 15rem;
    margin: 1rem;
  }

  .p-library__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-library__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-library__item {
    width: 90%;
    height: 15rem;
    margin: 1rem;
  }

  .p-library__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-library__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>

<template>
  <section class="p-library__item c-flex--wrap c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'categories', params: { username: String($route.params.username), library_id: id } }"></router-link>
    <section class="p-library__menuArea c-flex--spaceBetween c-align-center">
      <CassetteCheckbox :id="id" :contentName="'ライブラリ'" :contentType="'library'" />
      <CassetteMenu :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-library__body js-tooltip__title">
      <p class="p-library__title js-title" :data-title="title">{{ titleForView(title, 'library') }}</p>
      <p class="p-library__contents">{{ contentForView(content, 'library') }}</p>
    </section>
    <span class="p-library__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>
