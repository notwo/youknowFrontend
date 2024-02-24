<script setup lang="ts">
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';
import CassetteMenu from '@/components/keyword/CassetteMenu.vue';
import CassetteCheckbox from '@/components/common/CassetteCheckbox.vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
  updated_at: String,
  tags: Array
});
</script>

<style scoped>
.p-keyword__item {
  position: relative;
  width: 90%;
  height: auto;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-keyword__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-keyword__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-keyword__menuArea {
  margin: .6rem;
  z-index: 1;
}

.p-keyword__body {
  margin: 1rem .5rem;
}

.p-keyword__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-keyword__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-keyword__updated_at {
  margin: .3rem;
  font-size: .8rem;
}

.p-keyword__tags {
  display: flex;
  justify-content: flex-start;
  margin: .6rem .4rem;
  max-height: 6rem;
  background: rgba(101, 75, 250, 0.9);
  border-radius: .2rem;
}

.p-keyword__tag {
  margin: .5rem;
  padding: .24rem .55rem;
  font-size: .8rem;
  background: rgba(255,255,255,.9);
  border-radius: .2rem;
}

/* sp */
@media screen and (max-width: 768px) {
  .p-keyword__item {
    width: 80%;
    margin: 1rem;
  }

  .p-keyword__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-keyword__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }

  .p-keyword__tags {
    max-height: none;
  }
}

/* tablet */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .p-keyword__item {
    width: 90%;
    margin: 1rem;
  }

  .p-keyword__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-keyword__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>

<template>
  <section class="p-keyword__item c-flex--wrap c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'keyword', params: {
      username: String($route.params.username),
      library_id: $route.params.library_id,
      category_id: $route.params.category_id,
      keyword_id: id
    } }">
    </router-link>
    <section class="p-keyword__menuArea c-flex--spaceBetween c-align-center">
      <CassetteCheckbox :id="id" :contentName="'キーワード'" :contentType="'keyword'" />
      <CassetteMenu :edit_state="edit_state" :id="id" :title="title" :content="content" />
    </section>
    <section class="p-keyword__body js-tooltip__title">
      <p class="p-keyword__title js-title" :data-title="title">{{ titleForView(title, 'keyword') }}</p>
      <p class="p-keyword__contents">{{ contentForView(content, 'keyword') }}</p>
      <section class="p-keyword__tags c-flex--wrap">
        <span class="p-keyword__tag" v-for="tag of tags" :key="tag.id">
          {{ titleForView(tag.title, 'tag') }}
        </span>
      </section>
    </section>
    <span class="p-keyword__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>
