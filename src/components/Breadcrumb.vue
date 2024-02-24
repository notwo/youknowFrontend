<script setup lang="ts">
import { onMounted, inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const titlesStore = inject('titles');

const breadcrumbString = ref([
  {
    name: 'top',
    pattern: `^\/`,
    params: {},
    text: 'TOP'
  },
  {
    name: 'libraries',
    pattern: '^\/.+\/libraries',
    params: { username: String(route.params.username) },
    text: 'ライブラリ'
  },
  {
    name: 'categories',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories',
    params: { username: String(route.params.username), library_id: route.params.library_id },
    text: titlesStore.library
  },
  {
    name: 'keywords',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories\/[0-9]+\/keywords',
    params: { username: String(route.params.username), library_id: route.params.library_id, category_id: route.params.category_id },
    text: titlesStore.category
  },
  {
    name: 'keyword',
    pattern: '^\/.+\/libraries\/[0-9]+\/categories\/[0-9]+\/keywords\/[0-9]+',
    params: { username: String(route.params.username), library_id: route.params.library_id, category_id: route.params.category_id, keyword_id: route.params.keyword_id },
    text: titlesStore.keyword
  },
]);

const fullPath: String = route.fullPath;
const visibleBreadcrumb = breadcrumbString.value.filter((element) => {
  const link_condition = (fullPath.match(element.pattern) && fullPath.match(element.pattern)[0] !== fullPath);
  const text_condition = (fullPath.match(element.pattern) && fullPath.match(element.pattern)[0] === fullPath);
  return link_condition || text_condition;
});

onMounted(() => {
  const breadcrumb = document.querySelector('.p-breadcrumb__contents');
  const scrollMaxX = (breadcrumb?.scrollWidth || 0) - (breadcrumb?.clientWidth || 0);
  breadcrumb?.scrollTo(scrollMaxX, 0);
});
</script>

<style scoped>
.p-breadcrumb__contents {
  display: flex;
  gap: 0 1rem;
  margin: 1rem;
  padding: .8rem 0 .8rem 1.1rem;
  border-radius: .2rem;
  font-weight: 800;
  background-color: #9ac9ec;
}
.p-breadcrumb__contents li {
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 1.2rem;
}
/* HOMEの部分
.p-breadcrumb__contents li:first-child a::before {
  display: inline-block;
  padding-right: 20px;
  width: 1em;
  height: 1em;
  margin-right: 4px;
  align-items: center;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M11.7%207.5%204%2013.8v6.8c0%20.4.3.7.7.7h4.7c.4%200%20.7-.3.7-.7v-4c0-.4.3-.7.7-.7h2.7c.4%200%20.7.3.7.7v4c0%20.4.3.7.7.7h4.7c.4%200%20.7-.3.7-.7v-6.8l-7.7-6.3h-.9zm12.1%204.4L20.3%209V3.2c0-.3-.2-.5-.5-.5h-2.3c-.3%200-.5.2-.5.5v2.9L13.3%203c-.7-.6-1.8-.6-2.5%200L.2%2011.8c-.2.2-.3.5-.1.7l1.1%201.3c.2.2.5.2.7.1l9.8-8.1h.6l9.8%208.1c.2.2.5.1.7-.1l1.1-1.3c.2-.2.1-.5-.1-.6z%22%20style%3D%22fill%3A%23fff%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  vertical-align: text-bottom;
  content: '';
}
*/
.p-breadcrumb__contents li:not(:last-child)::before,
.p-breadcrumb__contents li:not(:last-child)::after {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 1.6rem solid transparent;
  border-bottom: 1.6rem solid transparent;
  content:'';
}
.p-breadcrumb__contents li:not(:last-child)::before {
  right: 0;
  border-left: .7rem solid #fff;
}
.p-breadcrumb__contents li:not(:last-child)::after{
  right: .15rem;
  border-left: .7rem solid #9ac9ec;
}

.p-breadcrumb__contents a {
  color: #444;
  text-decoration: none;
}
.p-breadcrumb__contents a:hover {
  color: #000;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-breadcrumb__contents {
    font-size: .9rem;
    overflow-x: scroll;
    overflow-y: hidden; 
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
}
</style>

<template>
  <ul class="p-breadcrumb__contents">
    <li v-for="v in visibleBreadcrumb" :key="v.name" class="p-breadcrumb__content">
      <router-link v-if="fullPath.match(v.pattern) && (fullPath.match(v.pattern)[0] !== fullPath)" :to="{ name: v.name, params: v.params }">
        <span>{{ v.text }}</span>
      </router-link>
      <span v-else-if="fullPath.match(v.pattern) && fullPath.match(v.pattern)[0] === fullPath">
        {{ v.text }}
      </span>
    </li>
  </ul>
</template>
