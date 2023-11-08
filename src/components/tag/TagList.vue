<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import TagItem from "@/components/tag/TagItem.vue";
import TagForm from "@/components/tag/TagForm.vue";

const { user, isAuthenticated } = useAuth0();
const store = inject('tag');

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

});
</script>

<style scoped>
/* 一旦視覚的にわかりやすくするためにつける */
#tag-list {
  background: rgba(210,210,210, 0.9);
  width: 100%;
  height: 79px;
}

.tag-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>

<template>
  <article id="tag-list">
    <TagForm />
    <section class="tag-item">
      <TagItem
        v-for="tag in store.items.list"
          :key="tag.id"
          :id="tag.id"
          :title="tag.title"
          :custom_user="tag.custom_user"
          :custom_user_id="tag.custom_user_id"
      />
    </section>
  </article>
</template>
