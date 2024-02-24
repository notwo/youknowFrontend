<script setup lang="ts">
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';
import CassetteMenu from '@/components/category/CassetteMenu.vue';
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
.p-category__item {
  position: relative;
  width: 90%;
  height: 16rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-category__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-category__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-category__menuArea {
  margin: .6rem;
  z-index: 1;
}

.p-category__body {
  margin: 1rem .5rem;
}

.p-category__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-category__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-category__updated_at {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-category__item {
    width: 80%;
    height: 15rem;
    margin: 1rem;
  }

  .p-category__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-category__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-category__item {
    width: 90%;
    height: 15rem;
    margin: 1rem;
  }

  .p-category__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-category__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>

<template>
  <section class="p-category__item c-flex--wrap c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'keywords', params: { username: String($route.params.username), library_id: $route.params.library_id, category_id: id } }"></router-link>
    <section class="p-category__menuArea c-flex--spaceBetween c-align-center">
      <CassetteCheckbox :id="id" :contentName="'カテゴリ'" :contentType="'category'" />
      <CassetteMenu :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-category__body js-tooltip__title">
      <p class="p-category__title js-title" :data-title="title">{{ titleForView(title, 'category') }}</p>
      <p class="p-category__contents">{{ contentForView(content, 'category') }}</p>
    </section>
    <span class="p-category__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>
